import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Components
import UiCarousel from '../../carousel/UiCarousel';
import UiButton from '../../components/ui/funcComponents/ui/uiButton/UiButton';
import UiModal from "../../components/ui/funcComponents/ui/uiModal/UiModal";
import UiInputBox from "../../components/ui/funcComponents/ui/uiInputBox/UiInputBox";


function Tutorial(props) {


    const navigate = useNavigate();

    const location = useLocation();

    const images = ['39bdff', '39ff60', 'f7ff39', 'ff9a39', 'ff3939', 'e639ff'].map((ele, i) => {
        // let size = (i == 0) ? '600x400' : '100x100';
        // return `https://via.placeholder.com/${size}/${ele}/000?text=${i + 1}`;
        return `https://via.placeholder.com/600x400/${ele}/000?text=${i + 1}`;
    })

    let [showLoginModal, setShowLoginModal] = useState(false);

    let localStoragePlayers = JSON.parse(localStorage.getItem('players'));
    let players = localStoragePlayers ? localStoragePlayers : [];
    let username = '';

    function openModal() {
        setShowLoginModal(true);
    }

    function closeModal() {
        setShowLoginModal(false);
    }

    function addUser() {
        if (username !== '') {
            players.push({
                name: username,
                score: 0
            })
            localStorage.setItem('players', JSON.stringify(players));
            navigate('/game', {
                state: {
                    currentUser: username
                }
            });
        }
        else {
            alert('Please choose a valid username');
        }
    }

    function saveUsername(string) {
        username = string;
    }

    return (
        <>
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

            <div>
                <UiCarousel gallery={images} />
                <p>Descrizione regole</p>

                <UiButton
                    label={'Login'}
                    callback={openModal}
                />

            </div>
        </>
    );
}

export default Tutorial;