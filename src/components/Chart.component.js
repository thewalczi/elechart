import React, { useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';
import Bar from './Bar.component';

const Chart = () => {
    
    const { data, minValue, maxValue, hasNegative, chartHeight } = useContext(ChartDataContext)

    console.log(chartHeight); 
    
    let chartStyle = {
        height: chartHeight + '%'
    };

    return (
        <div className="chart">
            <div style={chartStyle} className="chart-container">
                <ChartScale/>
                <div className="chart-bars">
                    {data.map(item => {
                        return <Bar key={item.id} item={item}/>
                    })}
                </div>
            </div>
        </div>
        
    );
}

const ChartScale = () => {
    const { scale } = useContext(ChartDataContext);
    console.log(scale);
    return (
        <div className="chart-axis-y">
            {scale.map((item, i) => (
            <div key={i} className="chart-axis-y-value" style={{bottom: item.height +'px'}}>
                <span>
                    {item.value}
                </span>
            </div>
            ))}
        </div>
    )
}
 
export default Chart;