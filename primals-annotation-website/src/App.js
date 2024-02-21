import React, { useState } from 'react';
import data from './data.json'; // Import the JSON data
import './App.css';
import Label from './Label';
function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <header>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </header>
      <main>
      <div id = "header">
          <Label primal = {"good"} selectedOption = {selectedOption} handleOptionChange={handleOptionChange}/>
          <Label primal = {"bad"} selectedOption = {selectedOption} handleOptionChange={handleOptionChange}/>
        </div>
        <br></br>
        <div id = "options">
          <div id = "col1">
            <ul>
              <li id = "primalOptions">
                <Label primal = {"safe"} selectedOption = {selectedOption} handleOptionChange={handleOptionChange}/>
                <Label primal = {"dangerous"} selectedOption = {selectedOption} handleOptionChange={handleOptionChange}/>
              </li>
            </ul>
          </div>
          <div id = "col2">

          </div>
          <div id = "col3">

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
