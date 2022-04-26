import React, { Component } from 'react';
import PropTypes from "prop-types";

//styles
import './UiCarousel.css';


class UiCarousel extends Component {

   constructor(props) {
      super(props);

      this.state = {
         images: this.props.gallery,
         gallerySize: this.props.gallery.length,
         currentImage: {
            id: 0,
            src: this.props.gallery[0].src,
            caption: this.props.gallery[0].caption
         }
      }

      this.sliderClick = this.sliderClick.bind(this);
   }

   prevArrow = require('../../../assets/icons/arrow-left.png');
   nextArrow = require('../../../assets/icons/arrow-right.png');

   sliderClick = (direction) => () => {

      this.setState((prevState) => {

         let newId = prevState.currentImage.id;
         newId = newId + direction;

         // se ti trovi sulla prima immagine e vai indietro, mostra l'ultima
         if (newId < 0) {
            newId = this.state.gallerySize - 1;
            // se ti trovi sull'ultima immagine e vai avanti, mostra la prima
         } else if (newId >= this.state.gallerySize) {
            newId = 0;
         }

         return {
            currentImage: {
               id: newId,
               src: prevState.images[newId].src,
               caption: prevState.images[newId].caption
            }
         }

      })
   }

   render() {
      return (
         <>
            <div className="frame">
               <picture>
                  <img src={this.state.currentImage.src} />
               </picture>
               <div className="arrow-container">
                  <div className="arrows left" onClick={this.sliderClick(-1)}>
                     <img src={this.prevArrow} />
                  </div><div className="arrows right" onClick={this.sliderClick(1)}>
                     <img src={this.nextArrow} />
                  </div>
               </div>
            </div>
            <p className='caption-container'>{this.state.currentImage.caption}</p>
         </>
      )
   }
}

UiCarousel.propTypes = {
   gallery: PropTypes.array.isRequired
}

export default UiCarousel;