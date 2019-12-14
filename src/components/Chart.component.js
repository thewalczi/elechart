import React, { useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';
import Bar from './Bar.component';

const Chart = () => {
    
    const { data, minValue, maxValue, hasNegative } = useContext(ChartDataContext)

    let chartHeight = hasNegative ? maxValue / (-minValue + maxValue) * 100 : 100;
    let chartStyle = {
        height: chartHeight + '%'
    };

    return (
        <div className="chart-outer">
            <div style={chartStyle} className="chart-axis">
                {data.map(item => {
                    return <Bar key={item.id} item={item}/>
                })}
            </div>
        </div>
        
    );
}
 
export default Chart;