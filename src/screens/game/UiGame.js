import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


//Styles
import './UiGame.css';

//Components
import Odysseus from "../../components/hookComponents/odysseus/Odysseus";
import UiModal from "../../components/funcComponents/ui/uiModal/UiModal";
import UiButton from "../../components/funcComponents/ui/uiButton/UiButton";


function UiGame() {

    const navigate = useNavigate();
    const location = useLocation();

    let localStoragePlayers = JSON.parse(localStorage.getItem('players'));
    let players = localStoragePlayers ? [...localStoragePlayers] : [];
    const currentUser = location.state.currentUser;

    const [state, setState] = useState({
        isPlaying: false,
        avatarPosition: 300,
        score: 0,
        scoreString: '',
        showModal: false,
        lastScoreString: '',
        gameStartAudio: new Audio(require('../../assets/sounds/game_start_audio.mp3')),
        soundOn: true
    });


    const GRAVITY = 5;
    const JUMP = 100;
    // const GAMESTARTAUDIO = new Audio(require('../../assets/sounds/game_start_audio.mp3'));
    const GAMEOVERAUDIO = new Audio(require('../../assets/sounds/game_over_audio.wav'));


    //Score
    useEffect(() => {

        const schedulerScore = setTimeout(() => {
            let newScore = state.score + 1;
            let scoreDate = new Date(newScore * 1000);
            let newScoreString = `${scoreDate.getMinutes()}m ${scoreDate.getSeconds()}s`;

            if ((window.innerHeight * 0.17 > state.avatarPosition) || (state.avatarPosition > window.innerHeight - window.innerHeight * 0.35)) {
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
    }, [state.score])


    //Avatar
    useEffect(() => {

        state.soundOn ? state.gameStartAudio.play() : state.gameStartAudio.pause();

        if (state.isPlaying) {

            // simula la gravità
            const schedulerGravity = setTimeout(() => {

                let newAvatarPosition = state.avatarPosition + GRAVITY;
                let newIsPlaying = state.isPlaying;
                let newShowModal = state.showModal;

                if ((window.innerHeight * 0.17 > state.avatarPosition) || (state.avatarPosition > window.innerHeight - window.innerHeight * 0.35)) {

                    GAMEOVERAUDIO.play();

                    // prima di resettare tutto salviamo per la classifica
                    players.push({
                        name: currentUser,
                        score: state.score
                    })
                    localStorage.setItem('players', JSON.stringify(players));
                    newIsPlaying = false;
                    newShowModal = true;
                }

                setState((state) => ({
                    ...state,
                    avatarPosition: newAvatarPosition,
                    isPlaying: newIsPlaying,
                    showModal: newShowModal,
                    lastScoreString: state.scoreString
                }));
            }, 100)

            return () => {
                clearTimeout(schedulerGravity);
            }

        }
    }, [state.isPlaying, state.avatarPosition, state.soundOn]);


    function jump() {

        let jumpPosition = state.avatarPosition - JUMP;

        setState({
            ...state,
            avatarPosition: jumpPosition
        });

    }

    function handleStartGame() {

        setState({
            ...state,
            isPlaying: true,
            avatarPosition: 300,
            showModal: false,
            soundOn: false
        })
    }

    function handleGoBackToMenu() {
        navigate('/', {
            state: {
                currentUser: currentUser
            }
        });
        setState({
            ...state,
            soundOn: false
        })
    }

    function goToRanking() {
        navigate('/ranking', {
            state: {
                currentUser: currentUser
            }
        });
    }


    return (
        <>
            {
                state.showModal &&
                <UiModal
                    onPlayAgainClick={handleGoBackToMenu}
                    onClose={handleStartGame}
                    buttonLabel={'Exit game'}
                >
                    <p>Game over</p>
                    <p>{state.lastScoreString}</p>
                    <UiButton
                        callback={goToRanking}
                        label={'See ranking'}
                        buttonClass={'button rankingGameBtn'}
                    />
                </UiModal>
            }


            {
                !state.isPlaying &&
                <div className="wanna-play-container">

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
                        <div className="parallax middleground"></div>
                        <div className="parallax foreground"></div>
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