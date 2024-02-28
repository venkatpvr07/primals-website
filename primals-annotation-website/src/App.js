// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState([false, false, false]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState('');

  // Load text content from the JSON file
  useEffect(() => {
    fetch('/dataset.json')
      .then(response => response.json())
      .then(data => setText(data.text))
      .catch(error => console.error('Error loading text content:', error));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedOptions([]);
    setAdditionalOptions([false, false, false]); // Reset additional options
  };

  const handleAdditionalOptionChange = (index) => {
    const updatedOptions = [...additionalOptions];
    updatedOptions[index] = !updatedOptions[index];
    const numSelected = updatedOptions.filter(option => option).length;
    if (numSelected > 2) {
      updatedOptions[index] = !updatedOptions[index];
    }
    setAdditionalOptions(updatedOptions);
  };

  const handleTreeOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else if (selectedOptions.length < 2) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
     <textarea
          className="text-box"
          placeholder="Type your text here..."
          rows="10"
          value={text} // Set the value of the text box
          readOnly // Make the text box read-only
        />
      <header>
        {/* <h1>{data.title}</h1>
        <p>{data.content}</p> */}
      </header>
      <main>
        <div>
          <label>
            <input
              type="radio"
              value="good"
              checked={selectedOption === "good"}
              onChange={() => handleOptionChange("good")}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              value="bad"
              checked={selectedOption === "bad"}
              onChange={() => handleOptionChange("bad")}
            />
            Bad
          </label>
        </div>
        <div className="additional-options-container">
          {selectedOption === "good" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="checkbox"
                  checked={additionalOptions[0]}
                  onChange={() => handleAdditionalOptionChange(0)}
                />
                Safe
              </label>
              <Tree option={selectedOption} folder="folder1" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "good" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="checkbox"
                  checked={additionalOptions[1]}
                  onChange={() => handleAdditionalOptionChange(1)}
                />
                Enticing
              </label>
              <Tree option={selectedOption} folder="folder2" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "good" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="checkbox"
                  checked={additionalOptions[2]}
                  onChange={() => handleAdditionalOptionChange(2)}
                  disabled={additionalOptions.length >= 2 && !additionalOptions.includes(additionalOptions[2])}
                />
                Alive
              </label>
              <Tree option={selectedOption} folder="folder3" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "bad" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="checkbox"
                  checked={additionalOptions[0]}
                  onChange={() => handleAdditionalOptionChange(0)}
                />
                Dangerous
              </label>
              <Tree option={selectedOption} folder="folder4" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "bad" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="checkbox"
                  checked={additionalOptions[1]}
                  onChange={() => handleAdditionalOptionChange(1)}
                />
                Dull
              </label>
              <Tree option={selectedOption} folder="folder5" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "bad" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="checkbox"
                  checked={additionalOptions[2]}
                  onChange={() => handleAdditionalOptionChange(2)}
                />
                Mechanistic
              </label>
              <Tree option={selectedOption} folder="folder6" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Tree({ option, folder, selectedOptions, onSelect }) {
  const treeData = {
    folder1: ["Pleasurable", "Regenerative", "Progressing", "Harmless", "Cooperative", "Stable", "Just"],
    folder2: ["Interesting", "Beautiful", "Abundant", "Worth Exploring", "Improvable", "Meaningful", "Funny"],
    folder3: ["Intentional", "Needs Me", "About Me"],
    folder4: ["Miserable", "Degenerative", "Declining", "Threatening", "Competitive", "Fragile", "Unust"],
    folder5: ["Boring", "Ugly", "Barren", "Not Worth Exploring", "Too Hard to Improve", "Meaningless", "Not Funny"],
    folder6: ["Unintentional", "Doesn't Need Me", "Indifferent"],
  };

  const handleOptionChange = (option) => {
    onSelect(option);
  };

  return (
    <div className="tree-container">
      <div className="tree">
        {folder && (
          <div className="folder">
            <ul>
              {treeData[folder].map((option, index) => (
                <li key={option}>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                      disabled={selectedOptions.length >= 2 && !selectedOptions.includes(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
