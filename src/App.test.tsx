import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import mockData from './mock_data.json';
import {PAGE_DATA_LIMIT as limit} from './constants';

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
})
