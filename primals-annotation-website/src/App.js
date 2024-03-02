// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState([false, false, false]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [text, setText] = useState('');
  const [showFooter, setShowFooter] = useState(false); // State to control footer visibility

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
    setShowFooter(false);
  };

  const handleAdditionalOptionChange = (index) => {
    const updatedOptions = [...additionalOptions];
    updatedOptions[index] = !updatedOptions[index];
    const numSelected = updatedOptions.filter(option => option).length;
    if (numSelected > 1) {
      updatedOptions[index] = !updatedOptions[index];
    }
    setAdditionalOptions(updatedOptions);
  };

  const handleTreeOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else if (selectedOptions.length < 1) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSaveAndExit = () => {
    // Perform action only if one option and one additional option are selected
    if (selectedOption && additionalOptions && selectedOptions.length === 1) {
      // Action logic here
      setShowFooter(true);
    }
  };

  const handleSaveAnnotations = () => {
    // Perform action only if one option and one additional option are selected
    if (selectedOption && additionalOptions && selectedOptions.length === 1) {
      // Action logic here
      setShowFooter(true);
    }
  };

  const handleNext = () => {
    // Perform action only if one option and one additional option are selected
    if (selectedOption && additionalOptions && selectedOptions.length === 1) {
      // Action logic here
      setShowFooter(true);
    }
  };
  return (
    <div>
     <textarea
          className="text-box"
          placeholder="Type your text here..."
          rows="5"
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
                  type="radio"
                  checked={additionalOptions[0]}
                  onChange={() => handleAdditionalOptionChange(0)}
                />
                Safe
              </label>
              <label>
                <input
                  type="radio"
                  checked={false}
                  // onChange={() => handleAdditionalOptionChange(0)}
                  disabled={true}
                />
                Dangerous
              </label>
              <Tree option={selectedOption} folder="folder1" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "good" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="radio"
                  checked={additionalOptions[1]}
                  onChange={() => handleAdditionalOptionChange(1)}
                />
                Enticing
              </label>
              <label>
                <input
                  type="radio"
                  checked={false}
                  // onChange={() => handleAdditionalOptionChange(0)}
                  disabled={true}
                />
                Dull
              </label>
              <Tree option={selectedOption} folder="folder2" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "good" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="radio"
                  checked={additionalOptions[2]}
                  onChange={() => handleAdditionalOptionChange(2)}
                />
                Alive
              </label>
              <label>
                <input
                  type="radio"
                  checked={false}
                  // onChange={() => handleAdditionalOptionChange(0)}
                  disabled={true}
                />
                Mechanistic
              </label>
              <Tree option={selectedOption} folder="folder3" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "bad" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="radio"
                  checked={additionalOptions[0]}
                  onChange={() => handleAdditionalOptionChange(0)}
                />
                Dangerous
              </label>
              <label>
                <input
                  type="radio"
                  checked={false}
                  // onChange={() => handleAdditionalOptionChange(0)}
                  disabled={true}
                />
                Safe
              </label>
              <Tree option={selectedOption} folder="folder4" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "bad" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="radio"
                  checked={additionalOptions[1]}
                  onChange={() => handleAdditionalOptionChange(1)}
                />
                Dull
              </label>
              <label>
                <input
                  type="radio"
                  checked={false}
                  // onChange={() => handleAdditionalOptionChange(0)}
                  disabled={true}
                />
                Enticing
              </label>
              <Tree option={selectedOption} folder="folder5" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
          {selectedOption === "bad" && (
            <div className="additional-option-container">
              <label>
                <input
                  type="radio"
                  checked={additionalOptions[2]}
                  onChange={() => handleAdditionalOptionChange(2)}
                />
                Mechanistic
              </label>
              <label>
                <input
                  type="radio"
                  checked={false}
                  // onChange={() => handleAdditionalOptionChange(0)}
                  disabled={true}
                />
                Alive
              </label>
              <Tree option={selectedOption} folder="folder6" selectedOptions={selectedOptions} onSelect={handleTreeOptionChange} />
            </div>
          )}
        </div>
      </main>
      {showFooter && (
        <footer className="footer">
          <button className="footer-button" onClick={handleSaveAndExit} disabled={selectedOption || selectedOptions.length === 0}>Save and Exit</button>
          <button className="footer-button" onClick={handleSaveAnnotations} disabled={!selectedOption || selectedOptions.length !== 1}>Save Annotations</button>
          <button className="footer-button" onClick={handleNext} disabled={!selectedOption || selectedOptions.length !== 1}>Next</button>
        </footer>
      )}
    </div>
  );
}

function Tree({ option, folder, selectedOptions, onSelect, selectedOption }) {
  const treeData = {
    folder1: ["Pleasurable", "Regenerative", "Progressing", "Harmless", "Cooperative", "Stable", "Just"],
    folder2: ["Interesting", "Beautiful", "Abundant", "Worth Exploring", "Improvable", "Meaningful", "Funny"],
    folder3: ["Intentional", "Needs Me", "About Me"],
    folder4: ["Miserable", "Degenerative", "Declining", "Threatening", "Competitive", "Fragile", "Unjust"],
    folder5: ["Boring", "Ugly", "Barren", "Not Worth Exploring", "Too Hard to Improve", "Meaningless", "Not Funny"],
    folder6: ["Unintentional", "Doesn't Need Me", "Indifferent"],
  };

  const handleOptionChange = (option) => {
    onSelect(option);
  };

  const isOptionDisabled = (folderName) => {
    // Disable options from folder 4, 5, and 6 if "good" is selected, and vice versa
    return (selectedOption === "good" && (folderName === "folder4" || folderName === "folder5" || folderName === "folder6")) ||
           (selectedOption === "bad" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3"));
  };

  return (
    <div className="tree-container">
      <div className="tree">
        <ul>
          {treeData[folder].map((option, index) => (
            <li key={option}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  disabled={isOptionDisabled(folder)}
                />
                {option}
              </label>
              {/* Render corresponding options from folders 4, 5, and 6 */}
              {(folder === "folder1" || folder === "folder2" || folder === "folder3") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]} // Get corresponding option from folders 4, 5, or 6
                    checked={false} // Always unchecked
                    disabled // Always disabled
                  />
                  {treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]} {/* Display corresponding option */}
                </label>
              )}
              {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]} // Get corresponding option from folders 4, 5, or 6
                    checked={false} // Always unchecked
                    disabled // Always disabled
                  />
                  {treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]} {/* Display corresponding option */}
                </label>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default App;
