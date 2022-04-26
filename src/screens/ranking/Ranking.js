import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Styles
import './Ranking.css';

// Components
import UiButton from '../../components/funcComponents/ui/uiButton/UiButton';

function Ranking() {

   const navigate = useNavigate();
   const location = useLocation();
   let username = location.state !== null ? location.state.currentUser : '';

   const players = JSON.parse(localStorage.getItem('players'));
   let content = '';
   let currentUserHeading = '';

   const renderPlayers = (user, key) => {

      let scoreDate = new Date(user.score * 1000);
      let scoreString = `${scoreDate.getMinutes()}m ${scoreDate.getSeconds()}s`;

      let trClass = '';
      let currentuserColumn = '';
      let amphoraIcon = require('../../assets/icons/amphora.png');

      if (username !== '') {
         currentuserColumn = <td></td>;
      }

      if (username === user.name) {
         currentUserHeading = <th></th>;
         trClass = "current-user";
         currentuserColumn = <td><picture><img src={amphoraIcon} /></picture></td>;
      }

      return (
         <tr key={`user${key}`} className={trClass}>
            {currentuserColumn}
            <td>
               {user.name}
            </td>
            <td>
               {scoreString}
            </td>
         </tr>
      )
   }

   if (players !== null && players.length > 0) {
      players.sort((a, b) => b.score - a.score);
      content = players.map(renderPlayers);
   } else {
      content = (
         <tr>
            <td colSpan={3}>
               <p>No matches have been played</p>
            </td>
         </tr>
      )
   }

   const goBack = () => {
      navigate(-1);
   }


   return (
      <div className='scoreContainer'>

         <h4 className="ranking-title">RANKING</h4>

         <table className='ranking-table'>

            <thead>
               <tr>
                  {currentUserHeading}
                  <th>Name</th>
                  <th>Score</th>
               </tr>
            </thead>

            <tbody>
               {content}
            </tbody>

         </table>

         <UiButton
            label={'Go back'}
            callback={goBack}
            buttonClass={'button rankingBtn'}
         />

      </div>
   );
}

export default Ranking;