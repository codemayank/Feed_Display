

import React, {FC, useState} from 'react';
import {PAGE_DATA_LIMIT as limit} from './constants';

import './App.css';

import Card from './Components/Card/Card';


const App: FC<appProps> = ({mockData}) => {
  
  let [offset, setOffset] = useState<number>(0)

  
  let displyedItems: cardData[] = mockData.slice(offset, offset + limit);
  let totalPages: number = Math.ceil(mockData.length / limit);

  let pages: page[] = [];
  for(let i = 0; i < totalPages; i++){
    let page = {
      pageNo: i+1,
      selected: offset === i
    }
    pages.push(page);
  }

  return (
    <div className="App">
      <div className="pages-navigation">
        {pages.map(({pageNo, selected}) => <button data-testid="page-nav-btn" key={pageNo} onClick={() => setOffset(pageNo - 1)} className={selected ? "page-button selected" : "page-button"}>{pageNo}</button>)}
      </div>
      <div className="cards-container">
        {displyedItems.map(item => <Card key={item.dateLastEdited} {...item} />)}
      </div>
    </div>
  );
}

export default App;
