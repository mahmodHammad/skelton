import React from 'react';
import './App.css';
import {Cat} from './components/Cat';
import Sidebar from './UI/Sidebar';


function App() {
  return (
    <div className="App">
      <Cat/>
    <Sidebar/>
    </div>
  );
}

export default App;
