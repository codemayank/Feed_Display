
//TODO
// Improve design
// Add search feature
// Add react router

import React, {FC, useState} from 'react';
import {PAGE_DATA_LIMIT as limit, Intents} from './constants';

import './App.css';

import Card from './Components/Card/Card';




const App: FC<appProps> = ({mockData, match, history}) => {
  
  
  let [offset, setOffset] = useState<number>(0);
  let [sortBy, setSortBy] = useState<number>(() => match.params.sortBy || Intents.resetSort);
  
  let [searchInput, setSearchInput] = useState<string>(() => match.params.searchBy || '');
  


  let mockDataCopy = [...mockData];

  if(sortBy === Intents.sortByName){
    mockDataCopy.sort((a:cardData, b:cardData) => {
      if(a.name > b.name){
        return 1
      }else if(a.name < b.name){
        return -1
      }else{
        return 0
      }
    })
  }

  if(sortBy === Intents.sortByDateEdited){
    mockDataCopy.sort((a: cardData, b:cardData) => {
      let aTime: number = new Date(a.dateLastEdited).getTime();
      let bTime: number = new Date(b.dateLastEdited).getTime();
      if(aTime > bTime){
        return 1;
      }else if(bTime > aTime){
        return -1
      }else{
        return 0;
      }
    })
  }


    mockDataCopy = mockDataCopy.filter(({name, description}) => {
      let nameLowerCase: string = name.toLowerCase();
      let descriptionLowerCase: string = description.toLowerCase();
      if(!searchInput){
        return true
      }
      let inDoubleQuotes = (searchInput[0] === '"' && searchInput[searchInput.length - 1] === '"');
      let inSingleQuotes = (searchInput[0] === "'" && searchInput[searchInput.length - 1] === "'");
      if(inDoubleQuotes || inSingleQuotes){
        let searchTerm = searchInput.slice(1, -1);
        searchTerm = searchTerm.toLowerCase();
        
        return nameLowerCase.includes(searchTerm) || descriptionLowerCase.includes(searchTerm);
      }else{
        let searchWords = searchInput.split(" ").map(word => word.toLowerCase());
        return searchWords.reduce((foundWord: boolean, word:string) => {
          
          return foundWord || nameLowerCase.includes(word) || descriptionLowerCase.includes(word)
        }, false)
      }
    })



  let displyedItems: cardData[] = mockDataCopy.slice(offset, offset + limit);
  let totalPages: number = Math.ceil(mockDataCopy.length / limit);

  let pages: page[] = [];
  for(let i = 0; i < totalPages; i++){
    let page = {
      pageNo: i+1,
      selected: offset === i
    }
    pages.push(page);
  }

  function setUrl(from: string){
    if(from === 'search' && searchInput){
      history.push(`/${sortBy}/${searchInput}`)
    }
    if(from === 'sort'){
      history.push(`/${sortBy}/${searchInput ? searchInput : ''}`)
    }
  }



  
  return (
    <div className="App">
      <div className="user-controls">
      <h1 className="app-heading">Feed</h1>
        
        <input onBlur={() => setUrl('search')} data-testid="search-input" className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" />
        
        
        <label className="sort">
          Sort: &nbsp;
          <select
            className="sort-selection"
            
            data-testid="select-sort-by"
            onChange={(e) => {
              setSortBy(Number(e.target.value))
              setUrl('sort')
            }}
          >
            <option value={Intents.resetSort}>None</option>
            <option value={Intents.sortByName}>Name</option>
            <option value={Intents.sortByDateEdited}>Date</option>
          </select>
        </label>
      </div>

      <div className="pages-navigation">
        {pages.map(({ pageNo, selected }) => (
          <button
            data-testid="page-nav-btn"
            key={pageNo}
            onClick={() => setOffset(pageNo - 1)}
            className={selected ? "page-button selected" : "page-button"}
          >
            {pageNo}
          </button>
        ))}
      </div>
      <div className="cards-container">
        {displyedItems.map((item) => (
          <Card key={item.dateLastEdited} {...item} />
        ))}
      </div>
    </div>
  );
}

export default App;
