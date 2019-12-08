import React from 'react';
import DataForm from './DataForm.component';
import Chart from './Chart.component';

const Container = () => {
    return (
        <div className="container">
            <DataForm/>
            <Chart/>
        </div>
    );
}
 
export default Container;