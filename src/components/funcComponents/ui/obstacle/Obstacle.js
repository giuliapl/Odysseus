import React from "react";

//styles
import './Obstacle.css';


function Obstacle(props) {



    return (

        <>
            <div
                className="obstacle"
                style={{
                    left: `${props.positionX}px`,
                    top: `${props.positionY}px`
                }}
            >
                <picture>
                    <img src={require('../../../../assets/icons/witch.png')} />
                </picture>

            </div>
        </>

    )
}

export default Obstacle;