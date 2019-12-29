import React, {useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';

const Bar = (props) => {
    const { maxValue, indexValue, hasPositiveValues } = useContext(ChartDataContext);

    let setBarHeight = (value) => {
        let barHeight = (value / (hasPositiveValues ? maxValue : indexValue)) * 100;
        return barHeight + '%';
    }


    return (
        <div className="bar-container">
            <div 
                className={`bar ${props.item.value < 0 ? 'negative' : ''}`}
                style={{height: `${setBarHeight(Math.abs(props.item.value))}`}}
            >
                <span>
                    {props.item.value}
                </span>
            </div>
        </div>
    );
}
 
export default Bar;