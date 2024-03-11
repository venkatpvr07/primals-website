import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function RadioButtonsGroup({ options, selectedOption, onChange }) {
  return (
    <div className="radio-buttons-group">
      {options.map(option => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

function OptionSet({ index, onOptionChange, onAdditionalOptionChange, onTreeOptionChange, currentPage }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    setSelectedOptions([]);
    setAdditionalOptions(null);
    setSelectedOption([]);
  }, [currentPage]);

  useEffect(() => {
    onOptionChange(selectedOptions, index);
    onAdditionalOptionChange(additionalOptions, index);
  }, [selectedOptions, additionalOptions, index, onOptionChange, onAdditionalOptionChange]);

  const handleTreeOptionChange = (option) => {
    setSelectedOption([option]);
    onTreeOptionChange(option, index);
  };

  return (
    <div>
      <RadioButtonsGroup
        options={["Good", "Bad"]}
        selectedOption={selectedOptions[index]}
        onChange={(option) => setSelectedOptions(prevOptions => {
          const updatedOptions = [...prevOptions];
          updatedOptions[index] = option;
          return updatedOptions;
        })}
      />
      <div className="additional-options-container">
        {selectedOptions[index] === "Good" && (
          <>
            <RadioButtonsGroup
              options={["Safe", "Enticing", "Alive"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            <Tree option={selectedOptions} folder="folder1" selectedOptions={selectedOption} onSelect={handleTreeOptionChange} />
            <Tree option={selectedOptions} folder="folder2" selectedOptions={selectedOption} onSelect={handleTreeOptionChange} />
            <Tree option={selectedOptions} folder="folder3" selectedOptions={selectedOption} onSelect={handleTreeOptionChange} />
          </>
        )}
        {selectedOptions[index] === "Bad" && (
          <>
            <RadioButtonsGroup
              options={["Dangerous", "Dull", "Mechanistic"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            <Tree option={selectedOptions} folder="folder4" selectedOptions={selectedOption} onSelect={handleTreeOptionChange} />
            <Tree option={selectedOptions} folder="folder5" selectedOptions={selectedOption} onSelect={handleTreeOptionChange} />
            <Tree option={selectedOptions} folder="folder6" selectedOptions={selectedOption} onSelect={handleTreeOptionChange} />
          </>
        )}
      </div>
    </div>
  );
}


function App() {
  const [optionSets, setOptionSets] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch('/dataset.json')
      .then(response => response.json())
      .then(data => {
        setTotalPages(data.pages.length);
        setPageData(data.pages);
        setText(data.pages[currentPage - 1].content);
      })
      .catch(error => console.error('Error loading text content:', error));
  }, [currentPage]);

  const handleOptionChange = (options, index) => {
    setOptionSets(prevOptionSets => {
      const updatedOptionSets = [...prevOptionSets];
      updatedOptionSets[index] = { ...updatedOptionSets[index], options };
      return updatedOptionSets;
    });
  };

  const handleAdditionalOptionChange = (additionalOptions, index) => {
    setOptionSets(prevOptionSets => {
      const updatedOptionSets = [...prevOptionSets];
      updatedOptionSets[index] = { ...updatedOptionSets[index], additionalOptions };
      return updatedOptionSets;
    });
  };

  const handleTreeOptionChange = (selectedOption, index) => {
    setOptionSets(prevOptionSets => {
      const updatedOptionSets = [...prevOptionSets];
      updatedOptionSets[index] = { ...updatedOptionSets[index], selectedOption };
      return updatedOptionSets;
    });
  };

  const handleDuplicateOptions = () => {
    // Check if the current number of option sets is less than 3 before adding a new duplicate
    if (optionSets.length < 2) {
      setOptionSets(prevOptionSets => {
        const lastOptionSet = prevOptionSets[prevOptionSets.length - 1];
        const newOptionSets = [...prevOptionSets, { ...lastOptionSet }];
        return newOptionSets;
      });
    } else {
      console.log("Maximum number of duplicate copies reached.");
    }
  };
  

  const handleSaveAnnotations = async () => {
    // Check if one option, one additionalOption, and one treeOption are selected for each option set
    for (const optionSet of optionSets) {
      if (
        optionSet.options.length < 1 ||
        !optionSet.additionalOptions ||
        optionSet.selectedOption.length < 1
      ) {
        console.log("Please select one option, one additionalOption, and one treeOption for each option set before saving annotations.");
        return;
      }
    }
  
    // Filter out null values from optionSets
    const currentPageOptions = optionSets
      .slice(0, pageData.length)
      .filter(options => options !== null);
    
    const dataToSave = {
      page: currentPage,
      options: currentPageOptions,
    };
    
    try {
      // Send the data to the server
      const response = await fetch('http://localhost:4000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
    
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {optionSets.map((_, index) => (
          <OptionSet
            key={index}
            index={index}
            onOptionChange={handleOptionChange}
            onAdditionalOptionChange={handleAdditionalOptionChange}
            onTreeOptionChange={handleTreeOptionChange}
            currentPage={currentPage} // Pass currentPage to OptionSet
          />
        ))}
        <footer className="footer">
          <button className="footer-button" onClick={handleDuplicateOptions}>Duplicate Options</button>
          <button className="footer-button" onClick={handleSaveAnnotations}>Save Annotations</button>
        </footer>
      </div>
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div className="navbar">
        <ul>
          {pageData.map((page, index) => (
            <li key={index}><button onClick={() => setCurrentPage(index + 1)}>Page {index + 1}</button></li>
          ))}
        </ul>
      </div>
      <textarea
        rows="5"
        value={text}
        readOnly
      />
    </div>
  );
}

function Tree({ option, folder, selectedOptions, onSelect }) {
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
    return (option === "Good" && (folderName === "folder4" || folderName === "folder5" || folderName === "folder6")) ||
           (option === "Bad" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3"));
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
                <span className={isOptionDisabled(folder) ? "disabled-text" : ""}>{option}</span>
              </label>
              {(folder === "folder1" || folder === "folder2" || folder === "folder3") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}</span>
                </label>
              )}
              {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}</span>
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
