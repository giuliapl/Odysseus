import React, { Component } from 'react';
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
      console.log(this.state.currentImage);
      return (
         <>
            <div className="frame-container">
               <div className="frame" style={{
                  backgroundImage: `url(${this.state.currentImage.src})`
               }}>
                  <div className="arrow-container">
                     <div className="arrows left" onClick={this.sliderClick(-1)}>
                        {/* <FontAwesomeIcon icon={faChevronLeft} size="lg" /> */}
                        prev
                     </div><div className="arrows right" onClick={this.sliderClick(1)}>
                        {/* <FontAwesomeIcon icon={faChevronRight} size="lg" /> */}
                        next
                     </div>
                  </div>
               </div>
            </div>
            <p>{this.state.currentImage.caption}</p>
         </>
      )
   }
}

export default UiCarousel;