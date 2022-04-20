import React from 'react';

//style
import './UiModal.css';

//components
import UiButton from '../uiButton/UiButton';


function UiModal(props) {

    function handleClick() {
        props.onPlayAgainClick();
    }

    function handleCloseModal() {
        props.onClose();
    }

    return (
        <>
            <div className='modal-container'>
                <UiButton
                    callback={handleCloseModal}
                    label={'Go Back to Menu'}
                />
                <div className='modal-content'>
                    {props.children}
                </div>
                <UiButton
                    callback={handleClick}
                    label={'Play Again'}
                />
            </div>
        </>
    )
}

export default UiModal;