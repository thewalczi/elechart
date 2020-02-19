import React, { useContext, useState, useRef, useEffect, Fragment } from 'react';
import { ChartDataContext } from '../../contexts/ChartData.context';

const useComponentVisible = (initial) => {
    const { currentItem, GetCurrentItem} = useContext(ChartDataContext);

    const [isEditable, setIsEditable] = useState(initial);
    const ref = useRef(null);

    const handleClickOutside = async (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsEditable(false);
            setTimeout(() => {
                GetCurrentItem('');
            })
            console.log('Clicked Outside')
        }
    };

    useEffect(() => {
        if(isEditable) {
            document.addEventListener('click', handleClickOutside, true)
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }
    });

    return {ref, isEditable, setIsEditable};
}

const Legend = () => {
    const { ref, isEditable, setIsEditable } = useComponentVisible(false);
    const { data, ToggleModalState, UpdateData, currentItem, GetCurrentItem } = useContext(ChartDataContext);

    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const addEditClass = (id, name, value) => {
        GetCurrentItem(id);
        setName(name);
        setValue(value);
        setIsEditable(true);
    }

    const acceptChanges = (e, id) => {
        e.preventDefault();
        UpdateData(id, name, value);
        GetCurrentItem('');
    }

    return (
        <div className="legend tile-container">
            <ul ref={ref} className="legend-container">
                {data.map(item => {
                    return (
                        <li 
                            key={item.id}
                            
                            id={item.id}
                            className={`legend-item ${currentItem === item.id ? 'legend-item-editable' : ''}`}
                            // onClick={currentItem !== item.id && !isEditable ? () => addEditClass(item.id, item.name, item.value) : null}
                            
                        >
                                {currentItem !== item.id ? (

                                    <div className="legend-item-data"
                                    onClick={() => addEditClass(item.id, item.name, item.value)}
                                    >
                                        <div className="legend-item-data-name">{item.name}</div>
                                        <div className="legend-item-data-value">{item.value}</div>
                                    </div>
                                ) : (

                                    <form className="legend-item-form" onSubmit={(e) => acceptChanges(e, item.id)}> 
                                            <div className="legend-item-form-name">
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)} 
                                                />
                                            </div>
                                            <div className="legend-item-form-value">
                                                <input
                                                    type="number"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                    />
                                            </div>
                                            <div className="toolbar-container">
                                                <button type="submit" className="button-icon button-accept"><span>v</span></button>
                                                <button type="button" className="button-icon button-remove" onClick={() => ToggleModalState(item.id)}><span>x</span></button>
                                            </div>
                                    </form>
                                )}
                                {/* )} */}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

// const DropdownList = (props) => {
//     return (
//         <div className="dropdown-container">
//             {props.children}
//         </div>
//     )
// }

export default Legend;