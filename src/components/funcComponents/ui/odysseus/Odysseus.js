import React, { useEffect } from "react";

//styles
import './Odysseus.css';


function Odysseus(props) {

   const ODYSSEUS_HEIGHT = 512;
   const ODYSSEUS_WIDTH = 397;

   useEffect(() => {
      let obj = document.querySelector('.odysseus img').getBoundingClientRect();
      let height = obj.height;
      let width = obj.width;
      props.setOdysseusSize(
         height,
         width
      );
   }, [])

   return (
      <>
         <div
            className="odysseus"
            style={{
               transform: `translateY(${props.positionY}px)`
            }}
         >
            <picture>
               <img src={require('../../../../assets/icons/odysseus.png')} />
            </picture>

         </div>
      </>
   )
}

export default Odysseus;