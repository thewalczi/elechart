import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ChartDataContext = createContext();

const ChartDataContextProvider = (props) => {
    const [data, setData] = useState([

        {
            name: 'data3',
            value: -3,
            id: 5
        }
    ]);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [scale, setScale] = useState([]);
    const [chartHeight, setChartHeight] = useState('');

    let hasNegative = minValue < 0 ? true : false;
    let hasPositive = maxValue >= 0 ? true : false;

    useEffect(() => {
        let valueArr = [];
        data.map(item => {
            return valueArr.push(item.value);
        })
        
        setMinValue(Math.min(...valueArr));
        setMaxValue(Math.max(...valueArr));
        
    }, [data])

    useEffect(() => {
        if(hasNegative && hasPositive){
            setChartHeight(maxValue / (-minValue + maxValue) * 100);
        }
        else if(hasNegative && !hasPositive){
            setChartHeight(0);
        }
        else {
            setChartHeight(100);
        }
    })

    useEffect(() => { //scale on Y axis
        let indexValue = Math.abs(minValue) > Math.abs(maxValue) ? {value: Math.abs(minValue), positive: false} : {value: Math.abs(maxValue), positive: true};
        let chartContainerHeight = document.querySelector('.chart-container').offsetHeight;
        console.log(indexValue);
        if (indexValue.value <= 10) {
            let indexScale = hasNegative && !hasPositive ? chartContainerHeight/Math.ceil(minValue) : chartContainerHeight/Math.ceil(maxValue);
            let initValue = hasNegative ? Math.ceil(minValue) : 0;
            let topScale = maxValue < 0 ? 0 : maxValue;
            let array = [];
            console.log(indexScale);
            console.log(chartContainerHeight);

            for(let i = initValue; i <= topScale; i++){
                let data = {value: i, height: Math.abs(indexScale) * i}
                array.push(data);
            }
            setScale(array)

        } else if (maxValue > 10 && maxValue < 100) {
            console.log('between 10 and 100');
        } else {
            console.log('more than 100');
        }
    }, [maxValue, minValue]);

    
    const AddData = (name, value) => {
        setData([...data, {name: name, value: value, id: uuid()}])
    }



    return (
        <ChartDataContext.Provider value={{data, maxValue, minValue, hasNegative, hasPositive, AddData, scale, chartHeight}}>
            {props.children}
        </ChartDataContext.Provider>
    );
}
 
export default ChartDataContextProvider;