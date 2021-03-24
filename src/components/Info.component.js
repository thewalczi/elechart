import React, {useContext} from 'react';
import { ChartDataContext } from '../context/ChartData.context';

const Info = () => {

    const { minValue, maxValue, avgValue } = useContext(ChartDataContext);

    return (
        <div className="info tile-container">
            <div className="info__indicator">
                <span className="info__indicator-title">Average</span>
                <span className="info__indicator-value">
                    {avgValue}
                </span>
            </div>
            <div className="info__indicator">
                <span className="info__indicator-title">Min</span>
                <span className="info__indicator-value">
                    {minValue}
                </span>
            </div>
            <div className="info__indicator">
                <span className="info__indicator-title">Max</span>
                <span className="info__indicator-value">
                    {maxValue}
                </span>
            </div>
        </div>
    )
}

export default Info;