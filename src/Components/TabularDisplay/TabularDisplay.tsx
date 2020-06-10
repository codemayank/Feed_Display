import React, {FC} from 'react';
import './TabularDisplay.css';

interface tabularDisplayProps {
  data: cardData[]
}



const TabularDisplay: FC<tabularDisplayProps> = ({data}) => {
  let headings = ['Name', 'Description', 'Date Modified', 'Image'];
  

  return (
    <div className="table-wrapper" data-testid="tabular-display">
      <div className="row">{headings.map(heading =>  <div key={heading} className="cell heading">{heading}</div>)}</div>
      {data.map((item: cardData) => {
        let {name, description, dateLastEdited, image} = item;
        let values = [name, description, dateLastEdited];
        
        return (
          <div key={dateLastEdited} className="row">
            {values.map((value) => (
              <div key={value} className="cell">{value}</div>
            ))}
            <div className="cell">
              <img className="cell-image" src={image} alt={name} />
            </div>
          </div>
        );
      })}
    </div>
  );
} 

export default TabularDisplay;