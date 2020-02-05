import React, {useContext } from 'react';
import { ChartDataContext } from '../../contexts/ChartData.context';

const Bars = () => {
    const { data, maxValue, indexValue, hasPositiveValues } = useContext(ChartDataContext);

    let setBarHeight = (value) => {
        let barHeight = (value / (hasPositiveValues ? maxValue : indexValue)) * 100;
        return barHeight + '%';
    }

    return (
        <div className="chart-bars">
            {data.map((item, i) => {
                return (
                    <div key={i} className="bar-container">
                        <div 
                            className={`bar ${item.value < 0 ? 'negative' : ''}`}
                            style={{height: `${setBarHeight(Math.abs(item.value))}`}}
                        >
                            <span className="bar-value-label">
                                {item.value}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
 
export default Bars;