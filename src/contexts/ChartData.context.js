import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ChartDataContext = createContext();

const ChartDataContextProvider = (props) => {
    const [data, setData] = useState([

        {
            name: 'data1',
            value: 15,
            id: 1
        },
        {
            name: 'data3',
            value: 28,
            id: 2
        },
        {
            name: 'data1',
            value: -21,
            id: 3
        },
        {
            name: 'data3',
            value: 33,
            id: 4
        },
        {
            name: 'data1',
            value: 18,
            id: 5
        },
        {
            name: 'data3',
            value: 22,
            id: 6
        },
        {
            name: 'data1',
            value: -15,
            id: 7
        },
        {
            name: 'data3',
            value: -30,
            id: 8
        },
        {
            name: 'data1',
            value: 30,
            id: 9
        },
        {
            name: 'data3',
            value: 33,
            id: 10
        },
        {
            name: 'data1',
            value: 18,
            id: 11
        },
        {
            name: 'data3',
            value: 22,
            id: 12
        }
    ]);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [scale, setScale] = useState([]);
    const [chartHeight, setChartHeight] = useState('');
    const [indexValue, setIndexValue] = useState('0');
    const [modalState, setModalState] = useState(false);
    const [currentItem, setCurrentItem] = useState('');

    let hasNegativeValues = minValue < 0 ? true : false;
    let hasPositiveValues = maxValue >= 0 ? true : false;


    let minMaxValueSetter = () => {
        let valueArr = [];
        data.map(item => {
            return valueArr.push(item.value);
        })
        
        setMinValue(Math.min(...valueArr));
        setMaxValue(Math.max(...valueArr));
    }

    let chartHeightSetter = () => {
        if(hasNegativeValues && hasPositiveValues){
            setChartHeight(maxValue / (-minValue + maxValue) * 100);
        }
        else {
            setChartHeight(100);
        }
    };

    let dynamicScale = async () => { //dynamic scale render on Y axis
        await setIndexValue(Math.abs(minValue) > Math.abs(maxValue) ? Math.abs(minValue) : Math.abs(maxValue));
        let chartContainerHeight = await document.querySelector('.chart-content').offsetHeight;  //height of the chart container
        let indexScale = await hasNegativeValues && !hasPositiveValues ? chartContainerHeight/Math.ceil(minValue) : chartContainerHeight/Math.ceil(maxValue); //distance between every point on scale
        let array = await []; // scale data placeholder
        let power = await indexValue.toString().length; // power of 10
        let divisor = await Math.pow(10, power - 1) / 4; // 10^power // divied by 2 allows for rendering semi-values like 15, 250 etc.
        let initValue = await hasNegativeValues ? Math.ceil(minValue / divisor) * divisor : 0; // start value for scale (the lowest)
        let topScale = await maxValue <= 0 ? 0 : Math.floor(maxValue / divisor) * divisor; // end value for scale (the highest)

        for(let i = initValue; i <= topScale; i++){
            let data = {value: i, height: Math.abs(indexScale) * i}
            if(i % divisor === 0){
                await array.push(data);
            }
        };
        
        setScale(array.length > 30 ? array.filter(item => item.value % (divisor * 2) === 0) : array); // Setting scale values with filter method to limit amount of values to only full-values (without semi-values)
    }

    useEffect(() => {
        minMaxValueSetter();
    }, [data]);

    useEffect(() => { 
       dynamicScale();
    }, [maxValue, minValue, indexValue]);

    useEffect(() => {
        chartHeightSetter();
    }, [hasNegativeValues, hasPositiveValues, maxValue, minValue]);

    
    const AddData = (name, value) => {
        setData([...data, {name: name, value: value, id: uuid()}]);
    }

    const RemoveData = id => {
        setData(data.filter(item => item.id !== id));
        setModalState(false);
    }

    const UpdateData = (itemId, newName, newValue) => {
        setData(
            data.map(item => {
                return item.id === itemId ? {...item, name: newName, value: newValue} : item;
            })
        );
    }

    const GetCurrentItem = (id) => {
        setCurrentItem(id);
    }

    const ToggleModalState = (item) => {
        setModalState(!modalState);
        setCurrentItem(item);
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
                RemoveData,
                UpdateData,
                scale,
                chartHeight,
                indexValue,
                modalState,
                ToggleModalState,
                currentItem,
                GetCurrentItem
            }}
        >
            {props.children}
        </ChartDataContext.Provider>
    );
}
 
export default ChartDataContextProvider;