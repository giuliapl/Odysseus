import React from "react";

//styles
import './Odysseus.css';


function Odysseus(props) {

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