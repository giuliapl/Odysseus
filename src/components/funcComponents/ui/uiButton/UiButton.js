import React from "react";
import PropTypes from 'prop-types';

//styles
import './UiButton.css';

function UiButton(props) {

    function handleButtonClick() {
        props.callback();
    }

    return (

        <button
            className={props.buttonClass}
            onClick={handleButtonClick}
        >
            <span>
                {props.label}
            </span>
        </button>
    )
}

UiButton.defaultProps = {
    label: 'X',
    buttonClass: 'button'
};

UiButton.propTypes = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string
}

export default UiButton;