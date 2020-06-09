import React from 'react';
import logo from './logo.svg';
import './App.css';
import mockdata from './mock_data.json';
import Card from './Components/Card/Card';


function App() {
  
  return (
    <div className="App">
      <div className="cards-container">
        {mockdata.map(item => <Card key={item.dateLastEdited} {...item} />)}
      </div>
    </div>
  );
}

export default App;
