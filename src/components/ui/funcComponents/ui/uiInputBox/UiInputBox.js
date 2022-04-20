import React from 'react';
import PropTypes from 'prop-types';


// STYLES
import './UiInputBox.css';

function UiInputBox(props) {

    const changeHandler = (e) => {
        props.callback(e.target.value);
    }

    return (


        <label className='inputLabel'>
            {props.label}
            <input
                onChange={changeHandler}
                className='inputBox'
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                tabIndex={props.tabIndex}
                value={props.value}
                required={props.required}
            />
        </label>
    )
}

UiInputBox.defaultProps = {
    type: 'text',
    placeholder: 'insert'

}

UiInputBox.propTypes = {
    callback: PropTypes.func.isRequired,
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    required: PropTypes.bool,
}

export default UiInputBox;