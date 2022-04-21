import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import UiCarousel from '../../carousel/UiCarousel';


function Tutorial(props) {


    const navigate = useNavigate();

    const location = useLocation();

    const images = ['39bdff', '39ff60', 'f7ff39', 'ff9a39', 'ff3939', 'e639ff'].map((ele, i) => {
        // let size = (i == 0) ? '600x400' : '100x100';
        // return `https://via.placeholder.com/${size}/${ele}/000?text=${i + 1}`;
        return `https://via.placeholder.com/600x400/${ele}/000?text=${i + 1}`;
    })


    return (
        <div>
            {/*Bottone x chiamare la modale del login*/}

            <UiCarousel gallery={images} />
        </div>
    );
}

export default Tutorial;