import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ChartDataContext = createContext();

const ChartDataContextProvider = (props) => {
    const [data, setData] = useState([

        // {
        //     name: 'data3',
        //     value: 3,
        //     id: 5
        // }
    ]);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [scale, setScale] = useState([]);
    const [chartHeight, setChartHeight] = useState('');
    const [indexValue, setIndexValue] = useState('');

    let hasNegativeValues = minValue < 0 ? true : false;
    let hasPositiveValues = maxValue >= 0 ? true : false;

    useEffect(() => {
        let valueArr = [];
        data.map(item => {
            return valueArr.push(item.value);
        })
        
        setMinValue(Math.min(...valueArr));
        setMaxValue(Math.max(...valueArr));
        
    }, [data])

    useEffect(() => {
        if(hasNegativeValues && hasPositiveValues){
            setChartHeight(maxValue / (-minValue + maxValue) * 100);
        }
        else {
            setChartHeight(100);
        }
    }, [hasNegativeValues, hasPositiveValues, maxValue, minValue]);

    let dynamicScale = async () => { //dynamic scale render on Y axis
        await setIndexValue(Math.abs(minValue) > Math.abs(maxValue) ? Math.abs(minValue) : Math.abs(maxValue));
        let chartContainerHeight = await document.querySelector('.chart-content').offsetHeight;
        let indexScale = await hasNegativeValues && !hasPositiveValues ? chartContainerHeight/Math.ceil(minValue) : chartContainerHeight/Math.ceil(maxValue);
        let initValue = await hasNegativeValues ? Math.ceil(minValue) : 0;
        let topScale = await maxValue < 0 ? 0 : maxValue;
        let array = await [];

        if (indexValue <= 10) {

            for(let i = initValue; i <= topScale; i++){
                let data = {value: i, height: Math.abs(indexScale) * i}
                array.push(data);
            }
            setScale(array)

        } else if (indexValue > 10 && indexValue <= 100) {
            console.log('between 10 and 100');
        } else if (indexValue > 100) {
            console.log('more than 100');
        }
    }

    useEffect(() => { 
       dynamicScale();
    }, [maxValue, minValue, indexValue])

    
    const AddData = (name, value) => {
        setData([...data, {name: name, value: value, id: uuid()}])
    }



    return (
        <ChartDataContext.Provider
            value={{
                data,
                maxValue,
                minValue,
                hasNegativeValues,
                hasPositiveValues,
                AddData,
                scale,
                chartHeight,
                indexValue
            }}
        >
            {props.children}
        </ChartDataContext.Provider>
    );
}
 
export default ChartDataContextProvider;