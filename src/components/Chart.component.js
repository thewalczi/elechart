import React, { useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';
import Bar from './Bar.component';

const Chart = () => {
    
    const { data, hasPositiveValues, chartHeight } = useContext(ChartDataContext);
    
    let chartStyle = {
        height: chartHeight + '%'
    };

    return (
        <div className="chart">
            <div className={`chart-container ${!hasPositiveValues ? 'only-negatives' : ''}`}>
                <div style={chartStyle} className="chart-content">                   
                    <ChartScale/>
                    <div className="chart-bars">
                        {data.map(item => {
                            return <Bar key={item.id} item={item}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

const ChartScale = () => {
    const { scale } = useContext(ChartDataContext);

    return (
        <div className="chart-scale">
            <div className="chart-x-axis"></div>
            {scale.map((item, i) => (
            <div key={i} className="chart-scale-value" style={{bottom: item.height +'px'}}>
                <span>
                    {item.value}
                </span>
            </div>
            ))}
        </div>
    )
}
 
export default Chart;