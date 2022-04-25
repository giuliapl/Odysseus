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
                style={{
                    transform: `translateY(${props.positionY}px)`,
                    backgroundColor: `purple`,
                    position: `absolute`,
                    width: `8px`,
                    height: `8px`,
                }}
            >
                Y
            </div>
            <div
                style={{
                    transform: `translateX(${props.positionX}px)`,
                    backgroundColor: `orange`,
                    position: `absolute`,
                    width: `8px`,
                    height: `8px`
                }}
            >
                X
            </div>
            <div
                style={{
                    transform: `translateY(${props.h}px)`,
                    backgroundColor: `black`,
                    position: `absolute`,
                    width: `8px`,
                    height: `8px`,
                }}
            >
                H
            </div>
            <div
                style={{
                    transform: `translateX(${props.w}px)`,
                    backgroundColor: `gray`,
                    position: `absolute`,
                    width: `8px`,
                    height: `8px`,
                }}
            >
                W
            </div>
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