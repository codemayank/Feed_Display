import React, {FC} from 'react';
import './card.css';

interface cardProps {
  image: string;
  name: string;
  description: string;
  dateLastEdited: string;
}

const Card:FC<cardProps> = ({image, name, description, dateLastEdited}) => {
  return (
    <div data-testid={dateLastEdited} className="card-container">
      <div className="card-image-wrapper">
        <img className="card-image" src={image} alt={name} data-testid="card-image" />
      </div>
      <div className="content-wrapper" ><h3 className="title" data-testid="name">{name}</h3>
      <p className="description">{description}</p></div>
    </div>
  );

}

export default Card;