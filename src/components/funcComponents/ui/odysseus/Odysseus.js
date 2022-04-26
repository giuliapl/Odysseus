import React, { useEffect } from "react";
import PropTypes from "prop-types";

//styles
import './Odysseus.css';


function Odysseus(props) {

   useEffect(() => {
      let obj = document.querySelector('.odysseus img').getBoundingClientRect();
      let width = obj.width;
      let height = obj.height;
      let centeredX = window.innerWidth / 2 - (obj.width / 2);
      props.setOdysseusSize(
         width,
         height,
         centeredX
      );
   }, [])

   return (
      <>
         <div
            className="odysseus"
            style={{
               transform: `translateY(${props.positionY}px)`,
               left: `${props.positionX}px`,
               width: `${props.width}px`,
               height: `${props.height}px`
            }}
         >
            <picture>
               <img src={require('../../../../assets/icons/odysseus.png')} />
            </picture>

         </div>
      </>
   )
}

Odysseus.propTypes = {
   setOdysseusSize: PropTypes.func.isRequired,
   positionX: PropTypes.number.isRequired,
   positionY: PropTypes.number.isRequired,
   width: PropTypes.number.isRequired,
   height: PropTypes.number.isRequired
}

export default Odysseus;