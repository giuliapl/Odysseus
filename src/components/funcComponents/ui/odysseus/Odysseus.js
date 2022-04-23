import React, { useEffect } from "react";

//styles
import './Odysseus.css';


function Odysseus(props) {

    useEffect(() => {
        props.setOdysseusSize(

            document.querySelector('.odysseus picture').getBoundingClientRect().width,
            document.querySelector('.odysseus picture').getBoundingClientRect().height
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