import React, { createContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ChartDataContext = createContext();

const ChartDataContextProvider = (props) => {
    const [data, setData] = useState([
        {
            name: 'data1',
            value: 20,
            id: 1
        },
        {
            name: 'data2',
            value: 30,
            id: 2
        },
        {
            name: 'data3',
            value: -10,
            id: 3
        }
    ]);

    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');

    useEffect(() => {
        let valueArr = [];
        data.map(item => {
            valueArr.push(item.value);
        })
        console.log(valueArr);
        
        setMinValue(Math.min(...valueArr));
        setMaxValue(Math.max(...valueArr));
        
    })
    
    const AddData = (name, value) => {
        setData([...data, {name: name, value: value, id: uuid()}])
    }



    return (
        <ChartDataContext.Provider value={{data, maxValue, minValue, AddData}}>
            {props.children}
        </ChartDataContext.Provider>
    );
}
 
export default ChartDataContextProvider;