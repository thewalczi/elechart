import React, { useContext, useState } from 'react';
import { ChartDataContext } from '../../contexts/ChartData.context';

const DataForm = () => {
    const {AddData} = useContext(ChartDataContext)
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        AddData(name, value);
        setName('');
        setValue('');
    }
    const disableButton = name === '' || value === '' ? 'disable' : '';

    return (
        <form className="data-form" onSubmit={handleSubmit}>
            <div className="data-form-name">
                <input id="name"type="text" value={name} tabIndex="0" onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="name">Name</label>
            </div>
            <div className="data-form-value">
                <input id="value" type="number" value={value} tabIndex="0" onChange={(e) => setValue(e.target.value)}/>
                <label htmlFor="value">Value</label>
            </div>
            <button type="submit" className="data-value-submit button-default form-button" disabled={disableButton}>Add</button>
        </form>
    );
}
 
export default DataForm;