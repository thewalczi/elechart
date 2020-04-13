import React from 'react';
import './style/Default.style.scss';
import ChartDataContextProvider from './context/ChartData.context';
import Header from './components/Header.component';
import DataForm from './components/DataForm.component';
import Chart from './components/Chart.component';
import Legend from './components/Legend.component';
import Modal from './components/Modal.component';


function App() {
  return (
    <div className="app">
      <ChartDataContextProvider>
        <div className="app-container">
          <Header/>
          <div className="container">
            <DataForm/>
            <div className="main-content">
              <div className="row">
                <Chart/>
                <Legend/>
              </div>
            </div>
          </div>
        </div>
        <Modal/>
      </ChartDataContextProvider>
    </div>
  );
}

export default App;
