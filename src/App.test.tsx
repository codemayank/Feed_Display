import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import App from './App';
import mockData from './mock_data.json';
import {PAGE_DATA_LIMIT as limit, Intents} from './constants';

function searchTestHelper(searchText: string, data: cardData[], testId: string){
  let {getByTestId, getAllByTestId} = render(<App mockData={data} />);
  let searchInput = getByTestId("search-input");
  expect(searchInput).toBeInTheDocument();
  fireEvent.change(searchInput, {target: {value: searchText}});
  let renderedNames = getAllByTestId(testId);
  return renderedNames;
}

describe('App Component',  () => {
  let newMockData = mockData;
  test('renders app component', () => {
    const { getByTestId} = render(<App mockData={newMockData}/>);
    let [firstCardData] = mockData;
    const firstCard = getByTestId(firstCardData.dateLastEdited);
    expect(firstCard).toBeInTheDocument();
  });

  test('pagination buttons are rendered', () => {
    const { getAllByTestId} = render(<App mockData={newMockData}/>);
    const pages =  getAllByTestId("page-nav-btn") ;
    expect(pages).toHaveLength(10);
  });

  test('no of cards rendered are less than or equal to limit', () => {
    const {getAllByTestId} = render(<App mockData={newMockData}/>);
    let cards = getAllByTestId("card-image");
    expect(cards.length).toBeLessThanOrEqual(limit)
  })

  test('sort by title', () => {
    

    const {getAllByTestId, getByTestId} = render(<App mockData={newMockData} />);
    fireEvent.change(getByTestId('select-sort-by'), {target: {value: Intents.sortByName}});

    let expectedOrder = ['Central Creative Producer', 'Central Implementation Coordinator', 'Central Research Strategist'];
    let renderedNames = getAllByTestId('name');
    let firstThree = Array.from(renderedNames).slice(0,3);
    firstThree.map((el, index) => expect(el.textContent).toEqual(expectedOrder[index]));
  })

  test('sort by date last edited', () => {
    
    let {getAllByTestId, getByTestId}  =render(<App mockData={newMockData} />);
    fireEvent.change(getByTestId('select-sort-by'), {target: {value: Intents.sortByDateEdited}})

    let expectedOrder = ['Chief Brand Orchestrator', 'Lead Solutions Engineer', 'Principal Operations Architect'];

    let renderedNames = getAllByTestId('name');
    let firstThree = Array.from(renderedNames).slice(0,3);
    firstThree.map((el, index) => expect(el.textContent).toEqual(expectedOrder[index]));
  })

  test('reset button works', () => {
    let {getAllByTestId, getByTestId} = render(<App mockData={newMockData} />)
    fireEvent.change(getByTestId('select-sort-by'), {target: {value:Intents.sortByDateEdited }});
    fireEvent.change(getByTestId('select-sort-by'), {target: {value: Intents.resetSort}});
    let expectedOrder = newMockData.slice(0, 3).map(({name}) => name);

    let renderedNames = getAllByTestId('name');
    let firstThree = Array.from(renderedNames).slice(0,3);
    firstThree.map((el, index) => expect(el.textContent).toEqual(expectedOrder[index]));
  })
  test('search by word sequence works', () => {
    // let {getByTestId, getAllByTestId} = render(<App mockData={newMockData} />);
    // let searchInput = getByTestId('search-input');
    // expect(searchInput).toBeInTheDocument();
    let searchTerm = "'Customer Assurance Liaison'";
    // fireEvent.change(searchInput, {target: {value: searchTerm}});
    // let renderedNames = getAllByTestId('name');
    let renderedNames = searchTestHelper(searchTerm, mockData, 'name');
    let expectedOutput = 'Customer Assurance Liaison';
    expect(renderedNames).toHaveLength(1);
    expect(renderedNames[0].textContent).toBe(expectedOutput);

  })

  test('search by multiple words works', () => {
    
    let searchTerm = 'Factor Assurance';
    let renderedNames = searchTestHelper(searchTerm, mockData, 'name');
    
    expect(renderedNames).toHaveLength(5);
    

  })

})

