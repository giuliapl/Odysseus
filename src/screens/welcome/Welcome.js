import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//styles
import './Welcome.css';

//components
import UiButton from "../../components/ui/funcComponents/ui/uiButton/UiButton";
import UiModal from "../../components/ui/funcComponents/ui/uiModal/UiModal";
import UiInputBox from "../../components/ui/funcComponents/ui/uiInputBox/UiInputBox";


function Welcome(props) {

    const navigate = useNavigate();
    const location = useLocation();

    let [showLoginModal, setShowLoginModal] = useState(false);


    function goToTutorial() {
        navigate('/tutorial')
    }

    function goToGame() {
        //PASSARE LO USERNAME
        navigate('/game')
    }

    function openModal() {
        setShowLoginModal(true);
    }

    function closeModal() {
        setShowLoginModal(false);
    }

    return (
        <>
            <div className="welcome-container">
                <h4>WELCOME</h4>

                <UiButton
                    label={'See the Tutorial'}
                    callback={goToTutorial}
                />

                <UiButton
                    label={'Login'}
                    callback={openModal}
                />
            </div>

            {
                showLoginModal &&
                <UiModal
                    onClose={closeModal}
                    onPlayAgainClick={goToGame}
                    closeLabel={'X'}
                    buttonLabel={'Submit & Play'}
                >
                    Choose your username:
                    <UiInputBox
                        placeholder={'Type here...'}
                    />
                </UiModal>
            }
        </>
    );
}

export default Welcome;