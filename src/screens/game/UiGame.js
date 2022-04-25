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

    const GRAVITY = 5;
    const JUMP = 100;
    const OBSTACLE_MOVEMENT = 5;
    const GAMEOVER_AUDIO = new Audio(require('../../assets/sounds/game_over_audio.wav'));
    const CLOUDS_HEIGHT = Math.floor(window.innerHeight * 0.17);
    const KRAKEN_HEIGHT = Math.floor(window.innerHeight - window.innerHeight * 0.45);
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = location.state?.currentUser;
    const GAME_MILLISECONDS = 100;

    let localStoragePlayers = JSON.parse(localStorage.getItem('players'));
    let players = localStoragePlayers ? [...localStoragePlayers] : [];


    const [state, setState] = useState({
        isPlaying: false,
        score: 0,
        scoreString: '',
        showModal: false,
        lastScoreString: '',
        gameStartAudio: new Audio(require('../../assets/sounds/game_start_audio.mp3')),
        soundOn: true,
        odysseus: {
            x: 200,
            y: 300,
            width: 0,
            height: 0
        },
        obstacle: {
            active: false,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    });


    //Avatar
    useEffect(() => {

        //state.soundOn ? state.gameStartAudio.play() : state.gameStartAudio.pause();

        const schedulerGravity = setTimeout(() => {
            let newOdysseus = state.odysseus;
            let newIsPlaying = state.isPlaying;
            let newShowModal = state.showModal;
            let newObstacle = state.obstacle;

            if (state.isPlaying) {
                // simula la gravità
                newOdysseus.y = newOdysseus.y + GRAVITY;

                //Controllo se l'ostacolo è già attivo
                if (!newObstacle.active) {

                    //Se non lo è, lo attivo e gli assegno le coordinate x e y (y randomica)
                    newObstacle = generateNewObstacle();
                }
                //Aggiorno la sua posizione sulla x
                newObstacle.x = newObstacle.x - OBSTACLE_MOVEMENT;

                //Controllo se c'è stata una collisione
                let collision = detectCollision(newOdysseus, newObstacle);

                //Caso di game over
                if ((CLOUDS_HEIGHT > newOdysseus.y) || (newOdysseus.y > KRAKEN_HEIGHT) || collision) {

                    GAMEOVER_AUDIO.play();

                    // prima di resettare tutto salviamo per la classifica
                    players.push({
                        name: currentUser,
                        score: state.score
                    })
                    localStorage.setItem('players', JSON.stringify(players));
                    newIsPlaying = false;
                    newShowModal = true;
                }
                else {
                    if (newObstacle.x <= 0) {
                        newObstacle.active = false;
                    }
                }

            }

            setState((state) => ({
                ...state,
                odysseus: newOdysseus,
                isPlaying: newIsPlaying,
                showModal: newShowModal,
                lastScoreString: state.scoreString,
                obstacle: newObstacle,
            }));
        }, GAME_MILLISECONDS)

        return () => {
            clearTimeout(schedulerGravity);
        }

    }, [state.isPlaying, state.odysseus.y, state.soundOn]);

    //Score
    useEffect(() => {

        const schedulerScore = setTimeout(() => {

            let newScore = state.score + 1;
            let scoreDate = new Date(newScore * 1000);
            let newScoreString = `${scoreDate.getMinutes()}m ${scoreDate.getSeconds()}s`;
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


    function detectCollision(avatar, obstacle) {
        if (avatar.x < obstacle.x + obstacle.width &&
            avatar.x + avatar.width > obstacle.x &&
            avatar.y < obstacle.y + obstacle.height &&
            avatar.height + avatar.y > obstacle.y) {
            return true;
        } else {
            return false;
        }
    }

    const range = (min, max) => {
        let rangeArray = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        return rangeArray;
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function goToRanking() {
        navigate('/ranking');
    }

    const generateNewObstacle = () => {
        let positionX = window.innerWidth + 50;
        let randomPositionY = randomIntFromInterval(KRAKEN_HEIGHT, CLOUDS_HEIGHT);
        let obstacle = {
            active: true,
            x: positionX,
            y: randomPositionY,
            width: 0,
            height: 0
        };
        return obstacle;
    }

    function setOdysseusSize(width, height) {
        console.log(height);
        let newOdysseus = state.odysseus;
        newOdysseus.width = width;
        newOdysseus.height = height;
        setState({
            ...state,
            odysseus: newOdysseus
        });
    }

    function setObstacleSize(width, height) {

        let newObstacle = state.obstacle;
        newObstacle.width = width;
        newObstacle.height = height;
        setState({
            ...state,
            obstacle: newObstacle
        });
    }

    function jump() {

        let newOdysseus = state.odysseus;
        newOdysseus.y = newOdysseus.y - JUMP;

        setState({
            ...state,
            odysseus: newOdysseus
        });

    }

    function handleStartGame() {

        let startObstaclePositionObject = generateNewObstacle();

        setState({
            ...state,
            isPlaying: true,
            odysseus: {
                x: 200,
                y: 300,
                width: 0,
                height: 0
            },
            showModal: false,
            soundOn: false,
            score: 0,
            obstacle: startObstaclePositionObject
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


    //RENDER
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
                            <Odysseus
                                setOdysseusSize={setOdysseusSize}
                                positionY={state.odysseus.y}
                                x={state.odysseus.x}
                                h={state.odysseus.height + state.odysseus.y}
                                w={state.odysseus.width + state.odysseus.x}
                            />
                        </div>
                    </div>
                }

                {
                    state.obstacle.active &&
                    <div>
                        <Obstacle
                            setObstacleSize={setObstacleSize}
                            positionX={state.obstacle.x} positionY={state.obstacle.y}
                            h={state.obstacle.height + state.obstacle.y} w={state.obstacle.width + state.obstacle.x}
                        />
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