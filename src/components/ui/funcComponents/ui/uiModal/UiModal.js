import React from 'react';

import './UiModal.css';

function UiModal(props) {
    return (
        <>
            <div className='modal-container'>
                <div className='modal-content'>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default UiModal;