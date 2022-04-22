import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";


//Styles
import './UiGame.css';

//Components
import Odysseus from "../../components/funcComponents/ui/odysseus/Odysseus";
import UiModal from "../../components/funcComponents/ui/uiModal/UiModal";
import UiButton from "../../components/funcComponents/ui/uiButton/UiButton";
import Obstacle from "../../components/funcComponents/ui/obstacle/Obstacle";


function UiGame() {

    const navigate = useNavigate();
    const location = useLocation();

    let localStoragePlayers = JSON.parse(localStorage.getItem('players'));
    let players = localStoragePlayers ? [...localStoragePlayers] : [];
    const currentUser = location.state?.currentUser;

    const CLOUDS_HEIGHT = Math.floor(window.innerHeight * 0.17);
    const KRAKEN_HEIGHT = Math.floor(window.innerHeight - window.innerHeight * 0.35);

    const range = (min, max) => {
        let rangeArray = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        return rangeArray;
    }
    let rangeY = range(CLOUDS_HEIGHT, KRAKEN_HEIGHT);

    const generateObstaclePosition = () => {
        let positionX = window.innerWidth + 50;
        let randomPositionY = Math.floor(Math.random() * rangeY.length);
        let positionObject = { x: positionX, y: randomPositionY };
        return positionObject;
    }
    let obstaclePositionObject = generateObstaclePosition();

    //detects death from crash with obstacles
    function isCollide(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) || //se Odisseo è sopra all'ostacolo
            (a.y > (b.y + b.height)) || //se Odisseo è sotto all'ostacolo
            ((a.x + a.width) < b.x) || //se l'ostacolo arriva da dx
            (a.x > (b.x + b.width)) //se l'ostacolo arriva da sx
        );
    }

    const [state, setState] = useState({
        isPlaying: false,
        avatarPosition: 300,
        score: 0,
        scoreString: '',
        showModal: false,
        lastScoreString: '',
        gameStartAudio: new Audio(require('../../assets/sounds/game_start_audio.mp3')),
        soundOn: true,
        odysseusCoordinates: {},
        obstacleCoordinates: obstaclePositionObject
    });


    const GRAVITY = 5;
    const JUMP = 100;
    const GAMEOVERAUDIO = new Audio(require('../../assets/sounds/game_over_audio.wav'));


    //Score
    useEffect(() => {

        const schedulerScore = setTimeout(() => {
            let newScore = state.score + 1;
            let scoreDate = new Date(newScore * 1000);
            let newScoreString = `${scoreDate.getMinutes()}m ${scoreDate.getSeconds()}s`;

            if ((CLOUDS_HEIGHT > state.avatarPosition) || (state.avatarPosition > KRAKEN_HEIGHT)) {
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
                let newOdysseusCoordinates = document.querySelector('.odysseus picture').getBoundingClientRect();
                let newIsPlaying = state.isPlaying;
                let newShowModal = state.showModal;

                //Make obstacles move
                let newObstacleCoordinates = state.obstacleCoordinates;
                newObstacleCoordinates.x = newObstacleCoordinates.x - GRAVITY;

                let collision = isCollide(state.odysseusCoordinates, state.obstacleCoordinates);
                console.log('collision', collision);

                if ((CLOUDS_HEIGHT > state.avatarPosition) || (state.avatarPosition > KRAKEN_HEIGHT) || collision) {

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
                    lastScoreString: state.scoreString,
                    odysseusCoordinates: newOdysseusCoordinates,
                    obstacleCoordinates: newObstacleCoordinates
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

        let startObstaclePositionObject = generateObstaclePosition();

        setState({
            ...state,
            isPlaying: true,
            avatarPosition: 300,
            showModal: false,
            soundOn: false,
            obstacleCoordinates: startObstaclePositionObject
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
        navigate('/ranking');
    }


    if (currentUser === undefined) {
        return <Navigate to='/' />;
    } else {
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
                            <Obstacle positionX={state.obstacleCoordinates.x} positionY={state.obstacleCoordinates.y} />
                        </div>
                    </div>
                }


            </>

        )

    }
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