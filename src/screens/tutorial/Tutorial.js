import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Components
import UiCarousel from '../../components/classComponents/uiCarousel/UiCarousel';
import UiButton from '../../components/funcComponents/ui/uiButton/UiButton';
import UiModal from "../../components/funcComponents/ui/uiModal/UiModal";
import UiInputBox from "../../components/funcComponents/ui/uiInputBox/UiInputBox";

//Styles
import './Tutorial.css';


function Tutorial(props) {


   const navigate = useNavigate();

   const location = useLocation();

   let path1 = require('../../assets/tutorial/tap.gif');
   let path2 = require('../../assets/tutorial/game_over_clouds.gif');
   let path3 = require('../../assets/tutorial/game_over_kraken.gif');

   const images = [
      {
         src: path1,
         caption: 'Tap on the screen to make Odysseus jump'
      },
      {
         src: path2,
         caption: 'Don\'t jump too high or you will come out of the water!'
      },
      {
         src: path3,
         caption: 'Avoid being caught by the kraken tentacles or you will sink!'
      }
   ]


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

         <div className="tutorial-container">
            <h4 className="tutorial-title">TUTORIAL</h4>
            <UiCarousel gallery={images} />

            <UiButton
               label={'Login'}
               callback={openModal}
               buttonClass={'button tutorialBtn'}
            />

         </div>
      </>
   );
}

export default Tutorial;