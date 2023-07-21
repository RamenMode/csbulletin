import React, { useState } from 'react';
import './SearchMenu.css'

const SearchMenu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  //const [selectedOption1, setSelectedOption1] = useState('Option 1');
  //const [selectedOption2, setSelectedOption2] = useState('Option 1');
  const [selectedOption3, setSelectedOption3] = useState('Option 1');

  // Dummy variables for dropdown options
  //const dropdownOptions1 = ['All Items', 'Weapons', 'Stickers', 'Lootboxes'];
  //const dropdownOptions2 = ['Option A', 'Option B', 'Option C'];
  const dropdownOptions3 = ['Newest', 'Latest'];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /*const handleDropdownChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleDropdownChange2 = (e) => {
    setSelectedOption2(e.target.value);
  };*/

  const handleDropdownChange3 = (e) => {
    setSelectedOption3(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your search logic here with the searchQuery and selected dropdown values
    console.log('Search query:', searchQuery);
    //console.log('Dropdown option 1:', selectedOption1);
    //console.log('Dropdown option 2:', selectedOption2);
    console.log('Dropdown option 3:', selectedOption3);
  };
// add testsearchmenu which is just a div if needed
  return (
      <div className="container-searchmenu">
        <form className="form-searchmenu" onSubmit={handleSubmit}>
          <input className = "input-searchmenu"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/*<div className = "first-two-select">
            <select className = "select-searchmenu" value={selectedOption1} onChange={handleDropdownChange1}>
              {dropdownOptions1.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select className = "select-searchmenu" value={selectedOption2} onChange={handleDropdownChange2}>
              {dropdownOptions2.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
              </div>*/}
          <select className = "select-searchmenu" value={selectedOption3} onChange={handleDropdownChange3}>
            {dropdownOptions3.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className = "button-searchmenu" type="submit">Search</button>
        </form>
      </div>
  );
};

export default SearchMenu;