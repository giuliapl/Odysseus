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
            className="button"
            onClick={handleButtonClick}
        >
            <span>
                {props.label}
            </span>
        </button>
    )
}

UiButton.defaultProps = {
    label: 'text',
};

UiButton.propTypes = {
    callback: PropTypes.func.isRequired,
    label: PropTypes.string
}

export default UiButton;