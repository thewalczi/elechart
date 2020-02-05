import React from 'react';
import './style/Default.style.scss';
import ChartDataContextProvider from './contexts/ChartData.context';
import Header from './components/Header/Header.component';
import DataForm from './components/DataForm/DataForm.component';
import Chart from './components/Chart/Chart.component';
import Legend from './components/Legend/Legend.component';


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
      </ChartDataContextProvider>
    </div>
  );
}

export default App;
