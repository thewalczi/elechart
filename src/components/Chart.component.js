import React, { useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';
import Bar from './Bar.component';

const Chart = () => {
    
    const { data, minValue, maxValue } = useContext(ChartDataContext)
    let chartHeight = {
        height: minValue < 0 ? maxValue / (-minValue + maxValue) * 100 + '%' : '100%'
    };

    return (
        <div className="chart-outer">
            <div style={chartHeight} className="chart-inner">
                {data.map(item => {
                    return <Bar key={item.id} item={item}/>
                })}
            </div>
        </div>
        
    );
}
 
export default Chart;