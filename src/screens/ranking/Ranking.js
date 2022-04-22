import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Styles
import './Ranking.css';

// Components
import UiButton from '../../components/funcComponents/ui/uiButton/UiButton';

function Ranking(props) {

   //FARE SORTING

   const navigate = useNavigate();
   const location = useLocation();

   const players = JSON.parse(localStorage.getItem('players'));
   let content = '';

   const renderPlayers = (user) => {

      let scoreDate = new Date(user.score * 1000);
      let scoreString = `${scoreDate.getMinutes()}m ${scoreDate.getSeconds()}s`;

      return (
         <tr>
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
            <td colSpan={2}>
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