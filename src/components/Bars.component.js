import React, { useContext, useState } from 'react';
import { ChartDataContext } from '../context/ChartData.context';

const Bars = () => {
    const { data, maxValue, indexValue, hasPositiveValues, barHover, HighlightBar } = useContext(ChartDataContext);

    // const [ isHover, setIsHover ] = useState('')

    let setBarHeight = (value) => {
        let barHeight = (value / (hasPositiveValues ? maxValue : indexValue)) * 100;
        return barHeight + '%';
    }

    let handleMouseOver = (id) => {
        HighlightBar(id);
    }

    let handleMouseOut = () => {
        HighlightBar('');
    }

    return (
        <div className="chart-bars">
            {data.map((item, i) => {
                return (
                    <div key={i} className="bar-container">
                        <div 
                            className={`bar ${item.value < 0 ? 'negative' : ''} ${barHover === item.id ? 'hovered' : ''}`}
                            style={{height: `${setBarHeight(Math.abs(item.value))}`}}
                            onMouseOver={() => handleMouseOver(item.id)}
                            onMouseOut={handleMouseOut}
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