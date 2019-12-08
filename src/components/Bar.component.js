import React, {useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';

const Bar = (props) => {
    const {chartSize, maxValue} = useContext(ChartDataContext)

    let setBarHeight = (value) => {
        let barHeight = value < 0 ? -(value / maxValue) * 100: (value / maxValue) * 100;
        console.log(barHeight);
        return barHeight + '%';
    }

    return (
        <div className="bar-container">
            <div className={`bar ${props.item.value < 0 ? 'negative' : ''}`} style={{height: `${setBarHeight(props.item.value)}`}}>
                <span>{props.item.value}</span>
            </div>
        </div>
    );
}
 
export default Bar;