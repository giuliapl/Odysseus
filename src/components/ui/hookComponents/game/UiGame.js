import React, { useEffect, useState } from "react";
import './UiGame.css';

//Components
import Odysseus from "../odysseus/Odysseus";
import UiModal from "../../funcComponents/ui/uiModal/UiModal";

function UiGame() {

    const [state, setState] = useState({
        isPlaying: false,
        avatarPosition: 300,
        score: 0,
        showModal: false
    });

    const GRAVITY = 5;
    const JUMP = 100;

    //Score
    useEffect(() => {

        const schedulerScore = setTimeout(() => {
            let newScore = state.score + 1;

            setState((state) => ({
                ...state,
                score: newScore
            }));

        }, 1000)

        return () => {
            clearTimeout(schedulerScore);
        }
    }, [state.score, state.isPlaying])


    //Avatar
    useEffect(() => {

        // simula la gravità
        const schedulerGravity = setTimeout(() => {

            let newAvatarPosition = state.avatarPosition + GRAVITY;
            let newIsPlaying = state.isPlaying;
            let newShowModal = state.showModal;

            if ((106 > newAvatarPosition) || (newAvatarPosition > window.innerHeight - 94)) {
                // prima di resettare tutto salviamo per la classifica
                newIsPlaying = false;
                newAvatarPosition = 180;
                newShowModal = true;
            }

            setState((state) => ({
                ...state,
                avatarPosition: newAvatarPosition,
                isPlaying: newIsPlaying,
                showModal: newShowModal
            }));

        }, 1000)

        return () => {
            clearTimeout(schedulerGravity);
        }

    }, [state.avatarPosition, state.isPlaying, state.showModal]);



    function jump() {

        let jumpPosition = state.avatarPosition - JUMP;
        let newIsPlaying = state.isPlaying;
        let newShowModal = state.showModal;

        if ((106 > jumpPosition) || (jumpPosition > window.innerHeight - 94)) {
            // prima di resettare tutto salviamo per la classifica
            newIsPlaying = false;
            jumpPosition = 180;
            newShowModal = true;
        }

        setState({
            ...state,
            avatarPosition: jumpPosition,
            isPlaying: newIsPlaying,
            showModal: newShowModal
        });

    }

    function handleStartGame() {
        setState({
            ...state,
            isPlaying: true
        })
    }

    return (
        <>
            {
                state.showModal &&
                <UiModal>You lose</UiModal>
            }

            {
                !state.isPlaying &&
                <div className="wanna-play-container">
                    <header>
                        <h1>Let's go!</h1>
                    </header>
                    <button onClick={handleStartGame}>
                        Start Game
                    </button>
                </div>
            }

            {
                state.isPlaying &&
                <div>
                    <button>Ranking</button>
                    <div className="game-container" onClick={jump}>
                        <Odysseus positionY={state.avatarPosition} />
                        <p>{state.score}</p>
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