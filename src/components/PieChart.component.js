import React, { useContext, useEffect, useState } from 'react';
import { ChartDataContext } from '../context/ChartData.context';

const PieChart = () => {

    const { data } = useContext(ChartDataContext);

    const [pieArray, setPieArray] = useState([]);

    let array = [];
    data.map(item => {
        return item.value >= 0 ? array.push({value: item.value, negative: false}) : array.push({value: Math.abs(item.value), negative: true, offset: 0});
    })
    let total = array.reduce((a, b) => {
        return a + b.value;
    }, 0);
    let percentage = array.map((item, i, arr) => {
        return {...item, value: item.value / total * 100, offset: arr[i - 1] ? arr[i - 1].value / total * 100 : 0};
    })
    let array2 = percentage.map((item, i, arr) => {
        return {...item, offset: arr[i - 1] ? item.offset + arr[i - 1].offset : 0, over50: item.value > 50 ? 1 : 0}
    })
    let array3 = percentage.reduce((a, b) => {
        return a + b.value;
        // console.log(value);
    }, 0);

    console.log(array3);
    // console.log(total);
    // console.log(percentage);

    // console.log(data);

    return (
        <div className="pie-chart tile-container">
            <div className="pie-chart-container">
                <div className="pie">
                    {/* {array2.map((item, i, arr) => {
                        return <div className="pie-segment" style={{'--offset': item.offset, '--value': item.value, '--bg': '#123456', '--over50': item.over50}}></div>
                    })} */}
                    {/* <div class="pie-segment" style={{'--offset': 0, '--value': 90, '--bg': '#654321', 'over50': 1}}></div> */}
                    {/* <div class="pie-segment" style={{'--offset': 60, '--value': 40, '--bg': '#654321', 'over50': 0}}></div> */}
                    {/* <div class="pie-segment" style={{'--offset': 40, '--value': 30, '--bg': '#654321'}}></div> */}
                    {/* <div class="pie-segment pie-segment_3"></div> */}
                </div>
            </div>
        </div>
    )
}

export default PieChart;