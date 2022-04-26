import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//components
import UiButton from '../../components/funcComponents/ui/uiButton/UiButton';
import UiModal from '../../components/funcComponents/ui/uiModal/UiModal';
import UiInputBox from '../../components/funcComponents/ui/uiInputBox/UiInputBox';

//styles
import './Welcome.css';

//Utils
import { setUser } from '../../utils/utils';


function Welcome() {

   const navigate = useNavigate();
   const location = useLocation();

   let [showLoginModal, setShowLoginModal] = useState(false);

   let localStoragePlayers = JSON.parse(localStorage.getItem('players'));
   let players = localStoragePlayers ? localStoragePlayers : [];
   let username = location.state !== null ? location.state.currentUser : '';

   function goToTutorial() {
      navigate('/tutorial');
   }

   function loginCallback() {
      setUser(username, navigate, '/game');
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
         {
            showLoginModal &&
            <UiModal
               onClose={closeModal}
               onButtonClick={loginCallback}
               closeLabel={'X'}
               buttonLabel={'Submit & Play'}
            >
               Choose your username:
               <UiInputBox
                  placeholder={'Type here...'}
                  callback={saveUsername}
                  tabIndex={1}
               />
            </UiModal>
         }

         <div className="welcome-container">
            <h4 className="welcome-title">WELCOME</h4>

            <UiButton
               label={'See Tutorial'}
               callback={goToTutorial}
            />

            {
               !username &&
               <UiButton
                  label={'Login & Play'}
                  callback={openModal}
                  buttonClass={'button loginPlayButton'}
               />
            }

            {
               username &&
               <UiButton
                  callback={loginCallback}
                  label={'Play again'}
                  buttonClass={'button loginPlayButton'}
               />
            }

            <UiButton
               label={'See Ranking'}
               callback={goToRanking}
            />
         </div>
      </>
   );
}

export default Welcome;