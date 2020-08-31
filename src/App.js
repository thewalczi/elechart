import React from 'react';
import './style/Default.style.scss';
import ChartDataContextProvider from './context/ChartData.context';
import Header from './components/Header.component';
import DataForm from './components/DataForm.component';
import BarChart from './components/BarChart.component';
import Legend from './components/Legend.component';
import Modal from './components/Modal.component';
import Info from './components/Info.component';


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
                <div className="column col-xl-8">
                  <BarChart/>
                  <Info/>
                </div>
                <div className="column col-xl-4">
                  <Legend/>
                </div>
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
