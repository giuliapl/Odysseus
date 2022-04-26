import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Components
import UiCarousel from '../../components/classComponents/uiCarousel/UiCarousel';
import UiButton from '../../components/funcComponents/ui/uiButton/UiButton';
import UiModal from "../../components/funcComponents/ui/uiModal/UiModal";
import UiInputBox from "../../components/funcComponents/ui/uiInputBox/UiInputBox";

//Styles
import './Tutorial.css';

//Utils
import {setUser} from '../../utils/utils';


function Tutorial() {

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
   let username = '';

   function openModal() {
      setShowLoginModal(true);
   }

   function closeModal() {
      setShowLoginModal(false);
   }

   function loginCallback() {
      setUser(username, navigate,'/game');
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