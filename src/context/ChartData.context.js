import React, { createContext, useState, useEffect } from 'react';
import { DefaultState } from './DefaultState';
import uuid from 'uuid/v1';

export const ChartDataContext = createContext();

const ChartDataContextProvider = (props) => {

    const [data, setData] = useState(DefaultState);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [avgValue, setAvgValue] = useState('');
    const [scale, setScale] = useState([]);
    const [chartHeight, setChartHeight] = useState('');
    const [indexValue, setIndexValue] = useState('0');
    const [modalState, setModalState] = useState(false);
    const [currentItem, setCurrentItem] = useState('');
    const [barHover, setBarHover ] = useState('');

    let hasNegativeValues = minValue < 0 ? true : false;
    let hasPositiveValues = maxValue >= 0 ? true : false;


    let minMaxValueSetter = () => {
        let valueArr = [];
        
        data.map(item => {
            return valueArr.push(item.value);
        })
        
        setMinValue(Math.min(...valueArr));
        setMaxValue(Math.max(...valueArr));
        setAvgValue(parseFloat((valueArr.reduce((a, b) => a + b, 0) / valueArr.length).toFixed(3)));
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
        let chartContainerHeight = await document.querySelector('.bar-chart-content').offsetHeight;  //height of the chart container
        let indexScale = await hasNegativeValues && !hasPositiveValues ? chartContainerHeight/Math.ceil(minValue) : chartContainerHeight/Math.ceil(maxValue); //distance between every point on scale
        let array = await []; // scale data placeholder
        let power = await indexValue.toString().length; // power of 10
        let divisor = await Math.pow(10, power - 1) / 4; // 10^power // divied by 2 allows for rendering semi-values like 15, 250 etc.
        let initValue = await hasNegativeValues ? Math.ceil(minValue / divisor - 2) * divisor : 0; // start value for scale (the lowest)
        let topScale = await maxValue <= 0 ? 0 : Math.floor(maxValue / divisor + 2) * divisor; // end value for scale (the highest)

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
    });

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

    const HighlightBar =  (id) => {
        setBarHover(id);
    }



    return (
        <ChartDataContext.Provider
            value={{
                data,
                maxValue,
                minValue,
                avgValue,
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
                GetCurrentItem,
                barHover,
                HighlightBar
            }}
        >
            {props.children}
        </ChartDataContext.Provider>
    );
}
 
export default ChartDataContextProvider;