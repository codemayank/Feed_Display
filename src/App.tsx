

import React, {FC, useState} from 'react';
import {PAGE_DATA_LIMIT as limit} from './constants';

import './App.css';

import Card from './Components/Card/Card';

enum Intents {
  sortByName,
  sortByDateEdited,
  resetSort
}


const App: FC<appProps> = ({mockData}) => {
  
  let [offset, setOffset] = useState<number>(0);
  let [sortByName, setSortByName] = useState<boolean>(false);
  let [sortByDateEdited, setSortByDateEdited] = useState<boolean>(false);


  let mockDataCopy = [...mockData];

  if(sortByName){
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

  if(sortByDateEdited){
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

  function action(intent: number){
    switch (intent) {
      case Intents.sortByName:
        setSortByName(true);
        setSortByDateEdited(false);
        break;
      case Intents.sortByDateEdited:
        setSortByDateEdited(true);
        setSortByName(false);
        break;
      case Intents.resetSort:
        setSortByDateEdited(false);
        setSortByName(false);
        break;
      default:
        break;
    }

  }

  
  return (
    <div className="App">
      <div className="content-control">
        <div className="button-group">
          <button
            className={`button-group-item ${
              !sortByName && !sortByDateEdited ? "selected-button" : ""
            }`}
            onClick={() => action(Intents.resetSort)}
          >
            None
          </button>
          <button
            className={`button-group-item ${
              sortByName ? "selected-button" : ""
            }`}
            onClick={() => action(Intents.sortByName)}
          >
            Sort by Name
          </button>
          <button
            className={`button-group-item ${
              sortByDateEdited ? "selected-button" : ""
            }`}
            onClick={() => action(Intents.sortByDateEdited)}
          >
            Last edited
          </button>
        </div>
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
