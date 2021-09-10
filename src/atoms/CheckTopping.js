import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function CardToping({ topping, key }) {
  const [isChosen, setIsChosen] = useState(false);
  const image = 'http://localhost:1000/public/image/'
  return (
    <div
     
      className="container-toping"
      onClick={() => setIsChosen(!isChosen)}
    >
       <img className='dp-topping-img' src = {image + topping.image} />
      <p className='dp-text-tp'>{(topping.title > 13 )? `${topping.title}...` : topping.title }</p>
        { isChosen &&  <FontAwesomeIcon icon={faCheckCircle}/> }
    </div>
  );
}

export default CardToping;
