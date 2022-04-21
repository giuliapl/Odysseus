import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


function Welcome(props) {


    const navigate = useNavigate();

    const location = useLocation();


    return (
        <div className="welcome-container">
            <h4>WELCOME</h4>

        </div>
    );
}

export default Welcome;