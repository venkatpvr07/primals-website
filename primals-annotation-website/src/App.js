import React, { useState, useEffect } from 'react';
import './App.css';

function RadioButtonsGroup({ options, selectedOption, onChange }) {

  // const handleOptionChange = (option) => {
  //   onChange(option);
  //   // Set instructions based on the selected option
  //   if (option === 'Good') {
  //     setInstruction('You chose "Good", so you can choose only one additionalOption.');
  //   } else if (option === 'Bad') {
  //     setInstruction('You chose "Bad", so you can choose additionalOptions freely.');
  //   }
  // };

  return (
    <span className="radio-buttons-group">
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
      {/* <div className="instructions">{instruction}</div> */}
    </span>
  );
}

function OptionSet({ index, onOptionChange, onAdditionalOptionChange, onTreeOptionChange, currentPage, resetOptions }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    setSelectedOptions([]);
    setAdditionalOptions(null);
    setSelectedOption([]);
    if(resetOptions){

    }
  }, [currentPage, resetOptions]);

  useEffect(() => {
    onOptionChange(selectedOptions, index);
    onAdditionalOptionChange(additionalOptions, index);
    onTreeOptionChange(selectedOption, index);
  }, [selectedOptions, additionalOptions, index, onOptionChange, onAdditionalOptionChange]);

  const handleTreeOptionChange = (option) => {
    setSelectedOption([option]);
    onTreeOptionChange(option, index);
  };

  const handleAdditionalOptionChange = (additionalOptions, index) => {
    setAdditionalOptions(additionalOptions);
    onAdditionalOptionChange(additionalOptions, index);
  };

  return (
    <>
    <div className="toplevel">
      <RadioButtonsGroup
        options={["Good", "Bad"]}
        selectedOption={selectedOptions[index]}
        onChange={(option) => setSelectedOptions(prevOptions => {
          const updatedOptions = [...prevOptions];
          updatedOptions[index] = option;
          return updatedOptions;
        })}
      />
      </div>
      <div className="additional-options-container">
        {selectedOptions[index] === "Good" && (
          <>
          <div id = "flex-col">
            <div>
            <RadioButtonsGroup
              options={["Safe"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Dangerous
            </span>
            </label>
            </div>
            <Tree option={selectedOptions} folder="folder1" selectedOptions={selectedOption} additionalOption={additionalOptions} onSelect={handleTreeOptionChange} />
          </div>
            
            <div id = "flex-col">
              <div>
            <RadioButtonsGroup
              options={["Enticing"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Dull
            </span>
            </label>
            </div>
            <Tree option={selectedOptions} folder="folder2" selectedOptions={selectedOption} additionalOption={additionalOptions} onSelect={handleTreeOptionChange} />
            </div>
            
            <div id = "flex-col">
            <div>
            <RadioButtonsGroup
              options={["Alive"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Mechanistic
            </span>
            </label>
            </div>
            <Tree option={selectedOptions} folder="folder3" selectedOptions={selectedOption} additionalOption={additionalOptions} onSelect={handleTreeOptionChange} />
            </div>
          </>
        )}
        {selectedOptions[index] === "Bad" && (
          <>
          <div id = "flex-col">
            <div>
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Safe
            </span>
            </label>
            <RadioButtonsGroup
              options={["Dangerous"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            </div>
            <Tree option={selectedOptions} folder="folder4" selectedOptions={selectedOption} additionalOption={additionalOptions} onSelect={handleTreeOptionChange} />
            </div>

            <div id = "flex-col">
            <div>
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Enticing
            </span>
            </label>
            <RadioButtonsGroup
              options={["Dull"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            </div>
            <Tree option={selectedOptions} folder="folder5" selectedOptions={selectedOption} additionalOption={additionalOptions} onSelect={handleTreeOptionChange} />
            </div>

            <div id = "flex-col">
            <div>
            <label>
            <span className="disabled-text">
              <input
                type="radio"
                checked={false}
                disabled
              />
              Alive
            </span>
            </label>
            <RadioButtonsGroup
              options={["Mechanistic"]}
              selectedOption={additionalOptions}
              onChange={setAdditionalOptions}
            />
            </div>
            <Tree option={selectedOptions} folder="folder6" selectedOptions={selectedOption} additionalOption={additionalOptions} onSelect={handleTreeOptionChange} />
            </div>
          </>
        )}
      </div>
    </>
  );
}


function App() {
  const [optionSets, setOptionSets] = useState([0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [text, setText] = useState('');
  const [resetOptions, setResetOptions] = useState(false);
  const [savedPages, setSavedPages] = useState([]);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [duplicateOption, setDuplicateOption] = useState('Bad');
  const [instruction, setInstruction] = useState('Choose one of Good, Bad');

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

  useEffect(()=>{
    setInstruction('Choose one of Good, Bad')
    if(optionSets[0].option==='Good')
      setDuplicateOption('Bad');
    else
      setDuplicateOption('Good');
    if(resetOptions){
      setIsDuplicated(false);
      if(optionSets.length>1){
        setOptionSets(optionSets.splice(1,1));
      }
      setResetOptions(false);
    }
  },[resetOptions])

  const handleOptionChange = (options, index) => {
    console.log(options, index);
    if(options[0]==='Bad')
      setDuplicateOption('Good');
    else
      setDuplicateOption('Bad');
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
    setIsDuplicated(true);
    // Check if the current number of option sets is less than 3 before adding a new duplicate
    if (optionSets.length < 2) {
      setOptionSets(prevOptionSets => {
        const lastOptionSet = prevOptionSets[prevOptionSets.length - 1];
        const newOptionSets = [...prevOptionSets, { ...lastOptionSet }];
        return newOptionSets;
      });
    } else {
      alert('Maximum number of duplicate copies reached.');
      console.log("Maximum number of duplicate copies reached.");
    }
  };
  

  const handleSaveAnnotations = async () => {  
    // Check if one option, one additionalOption, and one treeOption are selected for each option set
    for (const optionSet of optionSets) {
      console.log(optionSets);
      if (
        optionSet.options.length < 1 ||
        !optionSet.additionalOptions ||
        optionSet.selectedOption.length<1
      ) {
        alert('Please select one primary, one secondary, and one tertiary primals before saving annotations.');
        console.log("Please select one primary, one secondary, and one tertiary primals before saving annotations.");
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
        alert('Data saved successfully');
        console.log('Data saved successfully');
        setSavedPages([...savedPages, currentPage]);
      } else {
        alert('Failed to save data');
        console.error('Failed to save data:', response.statusText);
      }
    } catch (error) {
      alert('Exception occurred. Check console for details');
      console.error('Error saving data:', error);
    }
  };

    const handleNext = async () => {
    if (!savedPages.includes(currentPage)) {
      await handleSaveAnnotations(currentPage);
      for (const optionSet of optionSets)
      if(optionSet.options.length === 1 &&
        optionSet.additionalOptions &&
        optionSet.selectedOption.length === 1) {
          if (currentPage < totalPages) {
            resetPageOptions();
            setCurrentPage(currentPage + 1);
          }
        }
    }

    // Navigate to the next page if not already on the last page
    else if (currentPage < totalPages) {
      resetPageOptions();
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = async () => {
    if (!savedPages.includes(currentPage)) {
      await handleSaveAnnotations(currentPage);
      for (const optionSet of optionSets)
      if(optionSet.options.length === 1 &&
        optionSet.additionalOptions &&
        optionSet.selectedOption.length === 1) {
          if (currentPage > 1) {
            resetPageOptions();
            setCurrentPage(currentPage - 1);
          }
    }
  }
    else if (currentPage > 1) {
      resetPageOptions();
      setCurrentPage(currentPage - 1);
    }
  };

  const resetPageOptions = () =>{
     setResetOptions(true);
  }

  return (
    <div className="app-container">
        <textarea
          className='text-box'
          rows="5"
          value={text}
          readOnly
        />
        <h5 className='instructions'>
          {instruction}
        </h5>
        <div className="main-content">
        {optionSets.map((_, index) => (
          <OptionSet
            key={index}
            index={index}
            onOptionChange={handleOptionChange}
            onAdditionalOptionChange={handleAdditionalOptionChange}
            onTreeOptionChange={handleTreeOptionChange}
            currentPage={currentPage}
            resetOptions = {resetOptions} // Pass currentPage to OptionSet
          />
        ))}
        <footer className="footer">
          <button className="footer-button" onClick={handleDuplicateOptions} disabled={isDuplicated} >
            Add {duplicateOption} </button>
          <button className="footer-button" onClick={handleSaveAnnotations}>Save Annotations</button>
          <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </footer>
      </div>
      <div className="navbar">
        <ul>
          {pageData.map((page, index) => (
            <li key={index}><a href='#' style={{ color: savedPages.includes(index + 1) ? 'red' : 'navy' }} onClick={() => setCurrentPage(index + 1)}>Page {index + 1}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Tree({ option, folder, selectedOptions, additionalOption, onSelect }) {
  const [resetOptions, setResetOptions] = useState(false);

  useEffect(()=>{
    // if(optionSets[0].option==='Good')
    //   setDuplicateOption('Bad');
    // else
    //   setDuplicateOption('Good');
    if(resetOptions){
      // setIsDuplicated(false);
      // if(optionSets.length>1){
      //   setOptionSets(optionSets.splice(1,1));
      // }
      setResetOptions(false);
    }
  },[resetOptions])

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

  const resetPageOptions = () =>{
    setResetOptions(true);
 }

  const isOptionDisabled = (folderName) => {
    // resetPageOptions();
    return (additionalOption === "Safe" && (folderName === "folder2" || folderName === "folder3" || folderName === "folder4" || folderName === "folder5" || folderName === "folder6")) ||
           (additionalOption === "Enticing" && (folderName === "folder1" || folderName === "folder3" || folderName === "folder4" || folderName === "folder5" || folderName === "folder6")) ||
           (additionalOption === "Alive" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder4" || folderName === "folder5" || folderName === "folder6")) ||
           (additionalOption === "Dangerous" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3" || folderName === "folder5" || folderName === "folder6")) ||
           (additionalOption === "Dull" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3" || folderName === "folder4" || folderName === "folder6")) ||
           (additionalOption === "Mechanistic" && (folderName === "folder1" || folderName === "folder2" || folderName === "folder3" || folderName === "folder4" || folderName === "folder5"));
  };
if(option[0] === "Good")
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
              {/* {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}</span>
                </label>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if(option[1] === "Good")
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
              {/* {(folder === "folder4" || folder === "folder5" || folder === "folder6") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) - 3}`][index]}</span>
                </label>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  else
  return (
    <div className="tree-container">
      <div className="tree">
        <ul>
          {treeData[folder].map((option, index) => (
            <li key={option}>
              {/* {(folder === "folder1" || folder === "folder2" || folder === "folder3") && (
                <label>
                  <input
                    type="radio"
                    value={treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}
                    checked={false}
                    disabled
                  />
                  <span className="disabled-text">{treeData[`folder${parseInt(folder.slice(-1)) + 3}`][index]}</span>
                </label>
              )} */}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
