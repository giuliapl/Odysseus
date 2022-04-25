import React, { useEffect } from "react";

//styles
import './Obstacle.css';


function Obstacle(props) {

   useEffect(() => {
      let obj = document.querySelector('.obstacle img').getBoundingClientRect();
      props.setObstacleSize(
         obj.width,
         obj.height
      );
   }, [])

   return (
      <>
         <div
            className="obstacle"
            style={{
               transform: `translate(${props.positionX}px, ${props.positionY}px)`
            }}
         >
            <picture>
               <img src={props.iconSrc} />
            </picture>

         </div>
      </>
   )
}

export default Obstacle;