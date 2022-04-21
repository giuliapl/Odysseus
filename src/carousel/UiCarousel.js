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
                src: this.props.gallery[0]
            }
        }
    }

    sliderClick = (direction) => {
        this.setState((prevState) => {
            let newId = prevState.currentImage.id;

            direction === 'next' ? newId += 1 : newId -= 1;

            if (newId < 0) {
                newId = this.state.gallerySize - 1
            } else if (newId >= this.state.gallerySize) {
                newId = 0;
            }

            return {
                currentImage: {
                    id: newId,
                    src: prevState.images[newId]
                }
            }

        })
    }

    render() {
        return (
            <>
                <div className="frame-container">
                    <div className="frame" style={{
                        backgroundImage: `url(${this.state.currentImage.src})`
                    }}>
                        <div className="arrows left" onClick={() => this.sliderClick('previous')}>
                            {/* <FontAwesomeIcon icon={faChevronLeft} size="lg" /> */}
                            prev
                        </div><div className="arrows right" onClick={() => this.sliderClick('next')}>
                            {/* <FontAwesomeIcon icon={faChevronRight} size="lg" /> */}
                            next
                        </div>
                    </div>

                    <div className="thumbnail-container">
                        {
                            this.state.images.map((img, i) => {
                                return (
                                    <div className={`thumbnail ${this.state.currentImage.id === i ? 'selected' : ''}`} style={{ backgroundImage: `url(${img})` }}></div>
                                )
                            })
                        }
                        {/* {
                  ((this.state.gallerySize - 4) > 0) ? (
                     <div className="thumbnail last"><p className="counter-text">+{this.state.images.length - 4}</p></div>
                  ) : (<></>)
               } */}
                    </div>
                </div>


            </>
        )
    }
}

export default UiCarousel;