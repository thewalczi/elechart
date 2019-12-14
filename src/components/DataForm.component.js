import React, { useContext, useState } from 'react';
import { ChartDataContext } from '../contexts/ChartData.context';

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
    const disableButton = name == '' || value == '' ? 'disable' : '';

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="form-name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
            <input type="number"  className="form-value" value={value} placeholder="Value" onChange={(e) => setValue(e.target.value)}/>
            <input type="submit" disabled={disableButton} value="Add"/>
        </form>
    );
}
 
export default DataForm;