import React from 'react';
import './style/style.scss';
import ChartDataContextProvider from './contexts/ChartData.context';
import Header from './components/Header.component';
import Container from './components/Container.component';


function App() {
  return (
    <div className="App">
      <ChartDataContextProvider>
        <Header/>
        <Container/>
      </ChartDataContextProvider>
    </div>
  );
}

export default App;
