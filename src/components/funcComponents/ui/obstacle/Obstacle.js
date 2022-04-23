import React, { useEffect } from "react";

//styles
import './Obstacle.css';


function Obstacle(props) {

    useEffect(() => {
        props.setObstacleSize(

            document.querySelector('.obstacle picture').getBoundingClientRect().width,
            document.querySelector('.obstacle picture').getBoundingClientRect().height
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
                    <img src={require('../../../../assets/icons/witch.png')} />
                </picture>

            </div>
        </>

    )
}

export default Obstacle;