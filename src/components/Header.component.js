import React, { useContext } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';

const Header = () => {
    const { data } = useContext(ChartDataContext);
    return (
        <div>
            {data.map(item => {
                return (
                    <div key={item.id}>{`${item.name} ${item.value}`}</div>
                )
            })}
        </div>
    );
}
 
export default Header;