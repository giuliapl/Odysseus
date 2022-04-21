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

    let localStoragePlayers = JSON.parse(localStorage.getItem('players'));
    let players = localStoragePlayers ? localStoragePlayers : [];
    let username = location.state !== null ? location.state.currentUser : '';

    console.log('location.state', location.state);
    console.log('username', username);

    function goToTutorial() {
        navigate('/tutorial');
    }

    function goToGame() {
        navigate('/game', {
            state: {
                currentUser: username
            }
        });
    }

    function addUser() {
        if (username !== '') {
            players.push({
                name: username,
                score: 0
            })
            localStorage.setItem('players', JSON.stringify(players));
            goToGame();
        }
        else {
            alert('Please choose a valid username');
        }
    }

    function saveUsername(string) {
        username = string;
    }

    function goToRanking() {
        navigate('/ranking');
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
                    label={'See Tutorial'}
                    callback={goToTutorial}
                />

                {
                    !username &&
                    <UiButton
                        label={'Login'}
                        callback={openModal}
                    />
                }

                {
                    username &&
                    <UiButton
                        callback={goToGame}
                        label={'Play again'}
                    />
                }

                <UiButton
                    label={'See Ranking'}
                    callback={goToRanking}
                />
            </div>

            {
                showLoginModal &&
                <UiModal
                    onClose={closeModal}
                    onPlayAgainClick={addUser}
                    closeLabel={'X'}
                    buttonLabel={'Submit & Play'}
                >
                    Choose your username:
                    <UiInputBox
                        placeholder={'Type here...'}
                        callback={saveUsername}
                    />
                </UiModal>
            }
        </>
    );
}

export default Welcome;