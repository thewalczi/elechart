import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ChartDataContext = createContext();

const ChartDataContextProvider = (props) => {
    const [data, setData] = useState([
        {
            name: 'data1',
            value: 2,
            id: 1
        },
        {
            name: 'data2',
            value: 3,
            id: 2
        },
        {
            name: 'data3',
            value: -1,
            id: 3
        },
        {
            name: 'data5',
            value: 4,
            id: 4
        },
        {
            name: 'data3',
            value: -3,
            id: 5
        }
    ]);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    useEffect(() => {
        let valueArr = [];
        data.map(item => {
            return valueArr.push(item.value);
        })
        
        setMinValue(Math.min(...valueArr));
        setMaxValue(Math.max(...valueArr));
        
    }, [data])

    let hasNegative = minValue < 0 ? true : false;
    
    const AddData = (name, value) => {
        setData([...data, {name: name, value: value, id: uuid()}])
    }



    return (
        <ChartDataContext.Provider value={{data, maxValue, minValue, hasNegative, AddData}}>
            {props.children}
        </ChartDataContext.Provider>
    );
}
 
export default ChartDataContextProvider;