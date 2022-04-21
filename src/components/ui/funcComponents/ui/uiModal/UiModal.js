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

export default UiModal;