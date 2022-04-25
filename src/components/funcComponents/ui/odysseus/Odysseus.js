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
        if (height === 0 && width > 0) {
            height = (ODYSSEUS_HEIGHT * width) / ODYSSEUS_WIDTH
        }
        props.setOdysseusSize(
            height,
            width
        );
    }, [])

    return (

        <>
            <div
                style={{
                    transform: `translateY(${props.positionY}px)`,
                    backgroundColor: `blue`,
                    position: `absolute`,
                    width: `8px`,
                    height: `8px`,
                }}
            >
                Y
            </div>
            <div
                style={{
                    transform: `translateX(${props.x}px)`,
                    backgroundColor: `green`,
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
                    backgroundColor: `red`,
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
                    backgroundColor: `yellow`,
                    position: `absolute`,
                    width: `8px`,
                    height: `8px`,
                }}
            >
                W
            </div>
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