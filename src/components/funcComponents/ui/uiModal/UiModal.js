import React from 'react';
import PropTypes from "prop-types";

//style
import './UiModal.css';

//components
import UiButton from '../uiButton/UiButton';


function UiModal(props) {

    function handleClick() {
        props.onButtonClick();
    }

    function handleCloseModal() {
        props.onClose();
    }

    return (
        <>
            <div className='modal-container'>

                <div className='modal-content'>
                    <UiButton
                        callback={handleCloseModal}
                        label={props.closeLabel}
                        buttonClass={'button btnClose'}
                    />

                    {props.children}

                    <UiButton
                        callback={handleClick}
                        label={props.buttonLabel}
                    />
                </div>

            </div>
        </>
    )
}

UiModal.propTypes = {
   onClose: PropTypes.func.isRequired,
   onButtonClick: PropTypes.func.isRequired,
   closeLabel: PropTypes.string,
   buttonLabel: PropTypes.string.isRequired
}

export default UiModal;