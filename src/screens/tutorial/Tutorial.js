import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Components
import UiCarousel from '../../carousel/UiCarousel';
import UiButton from '../../components/ui/funcComponents/ui/uiButton/UiButton';
import UiModal from "../../components/ui/funcComponents/ui/uiModal/UiModal";
import UiInputBox from "../../components/ui/funcComponents/ui/uiInputBox/UiInputBox";

//Styles
import './Tutorial.css';


function Tutorial(props) {


   const navigate = useNavigate();

   const location = useLocation();

   /*    const images = ['39bdff', '39ff60', 'f7ff39', 'ff9a39', 'ff3939', 'e639ff'].map((ele, i) => {
         // let size = (i == 0) ? '600x400' : '100x100';
         // return `https://via.placeholder.com/${size}/${ele}/000?text=${i + 1}`;
         return `https://via.placeholder.com/600x400/${ele}/000?text=${i + 1}`;
      }) */


   const images = [
      {
         src: 'https://via.placeholder.com/600x400/39bdff/000?text=1',
         caption: 'Tap on the screen to make Odysseus jump'
      },
      {
         src: 'https://via.placeholder.com/600x400/39ff60/000?text=2',
         caption: 'Don\'t jump too high or you will come out of the water!'
      },
      {
         src: 'https://via.placeholder.com/600x400/f7ff39/000?text=3',
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