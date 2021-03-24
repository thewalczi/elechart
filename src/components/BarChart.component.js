import React, { useContext } from 'react';
import { ChartDataContext } from '../context/ChartData.context';
import Bars from './Bars.component';

const BarChart = () => {
    
    const { data, hasPositiveValues, chartHeight } = useContext(ChartDataContext);
    
    let chartStyle = {
        height: chartHeight + '%'
    };

    return (
        <div className="bar-chart tile-container">
            <div className={`bar-chart-container ${!hasPositiveValues ? 'only-negatives' : ''}`}>
                <div style={chartStyle} className="bar-chart-content">                   
                    <ChartScale/>
                    <Bars/>
                </div>
            </div>
        </div>
        
    );
}

const ChartScale = () => {
    const { scale } = useContext(ChartDataContext);

    return (
        <div className="bar-chart-scale">
            <div className="bar-chart-x-axis"></div>
            {scale.map((item, i) => (
            <div key={i} className="bar-chart-scale-value" style={{bottom: item.height +'px'}}>
                <span>
                    {item.value}
                </span>
            </div>
            ))}
        </div>
    )
}
 
export default BarChart;