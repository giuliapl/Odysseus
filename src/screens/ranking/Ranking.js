import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

//Styles
import './Ranking.css';

// Components
import UiButton from "../../components/ui/funcComponents/ui/uiButton/UiButton";

function Ranking(props) {

    //FARE SORTING
    const navigate = useNavigate();

    const location = useLocation();

    const players = JSON.parse(localStorage.getItem('players'));
    if (players && players.length > 0) {
        console.log(players);
    }

    const renderPlayers = (user) => {
        return (

            <tr>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.score}
                </td>
            </tr>
        )
    }

    const goBack = () => {
        navigate(-1);
    }


    return (
        <div className='scoreContainer'>

            <table className='ranking-table'>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>

                <tbody>

                    {players &&
                        players.map(renderPlayers)}
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