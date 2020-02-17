import React, { useContext } from 'react';
import { ChartDataContext } from '../../contexts/ChartData.context';

const Legend = () => {
    const { data, ToggleModalState } = useContext(ChartDataContext);
    return (
        <div className="legend tile-container">
            <ul className="legend-container">
                {data.map(item => {
                    return (
                        <li key={item.id} id={item.id} className="legend-item">
                            <span className="legend-item-name">{item.name}</span>
                            <span className="legend-item-value">{item.value}</span>
                            {/* <button className="legend-item-remove x-button icon-button"><span>+</span></button> */}
                            <button className="legend-item-remove icon-button threedot">
                                <DropdownList>
                                    <ul>
                                        <li>Edit</li>
                                        <li onClick={() => ToggleModalState(item.id)}>Remove</li>
                                    </ul>
                                </DropdownList>
                            </button>   
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

const DropdownList = (props) => {
    return (
        <div className="dropdown-container">
            {props.children}
        </div>
    )
}

export default Legend;