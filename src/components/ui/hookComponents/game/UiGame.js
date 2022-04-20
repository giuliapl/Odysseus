import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//Styles
import './UiGame.css';

//Components
import Odysseus from "../odysseus/Odysseus";
import UiModal from "../../funcComponents/ui/uiModal/UiModal";
import UiButton from "../../funcComponents/ui/uiButton/UiButton";


function UiGame() {

    const navigate = useNavigate();

    const [state, setState] = useState({
        isPlaying: false,
        avatarPosition: 300,
        score: 0,
        scoreString: '',
        showModal: false
    });

    const GRAVITY = 5;
    const JUMP = 100;

    //Score
    useEffect(() => {

        const schedulerScore = setTimeout(() => {
            let newScore = state.score + 1;
            let scoreDate = new Date(newScore * 1000);
            let newScoreString = `${scoreDate.getMinutes()}m ${scoreDate.getSeconds()}s`;

            if ((106 > state.avatarPosition) || (state.avatarPosition > window.innerHeight - 250)) {
                // prima di resettare tutto salviamo per la classifica
                newScore = 0;
            }

            setState((state) => ({
                ...state,
                score: newScore,
                scoreString: newScoreString
            }));

        }, 1000)

        return () => {
            clearTimeout(schedulerScore);
        }
    }, [state.score, state.isPlaying])


    //Avatar
    useEffect(() => {

        //if(state.isPlaying) {robe qui sotto} --> altrimenti Ulisse cade già

        // simula la gravità
        const schedulerGravity = setTimeout(() => {

            let newAvatarPosition = state.avatarPosition + GRAVITY;
            let newIsPlaying = state.isPlaying;
            let newShowModal = state.showModal;

            if ((106 > newAvatarPosition) || (newAvatarPosition > window.innerHeight - 250)) {
                // prima di resettare tutto salviamo per la classifica
                newIsPlaying = false;
                newShowModal = true;
            }

            setState((state) => ({
                ...state,
                avatarPosition: newAvatarPosition,
                isPlaying: newIsPlaying,
                showModal: newShowModal
            }));

        }, 100)

        return () => {
            clearTimeout(schedulerGravity);
        }


    }, [state.isPlaying, state.avatarPosition]);


    function jump() {

        let jumpPosition = state.avatarPosition - JUMP;

        /* Si può togliere perché viene già controllato in UseEffect, triggerato subito dopo il setState
         let newIsPlaying = state.isPlaying;
         let newShowModal = state.showModal;
 
         if ((106 > jumpPosition) || (jumpPosition > window.innerHeight - 94)) {
             // prima di resettare tutto salviamo per la classifica
             newIsPlaying = false;
             jumpPosition = 180;
             newShowModal = true;
         }
         */

        setState({
            ...state,
            avatarPosition: jumpPosition,
            //isPlaying: newIsPlaying,
            //showModal: newShowModal
        });

    }

    function handleStartGame() {
        setState({
            ...state,
            isPlaying: true,
            avatarPosition: 300
        })
    }

    function handleGoBackToMenu() {
        navigate("/");
    }

    return (
        <>
            {
                state.showModal &&
                <UiModal
                    onPlayAgainClick={handleStartGame}
                    onClose={handleGoBackToMenu}
                >You lose</UiModal>
            }

            {
                !state.isPlaying &&
                <div className="wanna-play-container">
                    <header>
                        <h1>Let's go!</h1>
                    </header>

                    <UiButton
                        callback={handleStartGame}
                        label={'Start Game'}
                    />
                </div>
            }

            {
                state.isPlaying &&
                <div>
                    <div className="game-container" onClick={jump}>
                        <div className="score-label">
                            {state.scoreString}
                        </div>
                        <Odysseus positionY={state.avatarPosition} />
                    </div>
                </div>
            }


        </>

    )

}


export default UiGame;

/*

- div contenitore con sfondo in parallasse che si muove sull'asse delle x
--- OK: componente <Odysseus> per gestire il personaggio che si sposta solo sull'asse delle y
--- componente <Obstacle> per gestire gli ostacoli che il personaggio deve evitare, che compaiono sull'asse delle x

- OK: se Ulisse va troppo in su o troppo in giù, game over
- se Ulisse becca un ostacolo, game over
- OK: se va tutto bene, il tempo continua a scorrere e quindi il punteggio si aggiorna


STATI:

- isPlaying
--- OK: inizializzato a false
--- OK: diventa true al click sul pulsante di start e fa partire il conteggio --> aggiorna counter con lo scheduler
--- e lo rirenderizza nella barra in alto
--- OK: counter inizializzato a 0
--- OK: diventa false al gameover, ferma il conteggio, azzera counter,
--- stoppa le animazioni, resetta gli ostacoli e la posizioni di Ulisse, e fa comparire la modale:
------ aggiorna la classifica tramite il localStorage

OK:
- avatarPosition --> modifica la posizione css del personaggio
--- dopo tot secondi sposta la position del personaggio in giù di totpx
--- al click sul div contenitore sposta la position del personaggio in su di totpx


- obstacle (position absolute) --> {}
--- show --> o true o false
------ inizializzato a false
------ diventa true ogni tot di secondi
------ se la x dell'ostacolo è uguale a quella di Ulisse e sulla y coincidono, game over
------ dopo tot secondi sposta la position a sinistra di tot px (translate-x)
------ quando arriva a x=0, show diventa false, image e position cambiano e delay viene riassegnato
--- image --> array di stringhe, scegli random
--- position
--- delay

- funzione x calcolo lunghezza totale dello schermo --> +n 
- OK: funzione x calcolo altezza totale dello schermo --> range randomico per la posizione sull'asse delle y

*/