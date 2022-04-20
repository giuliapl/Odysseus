import React, { Component, useState } from "react";
import './Game.css';

//Components
import Odysseus from "../../components/ui/hookComponents/odysseus/Odysseus";
import UiModal from "../../components/ui/funcComponents/ui/uiModal/UiModal";


class Game extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isPlaying: false,
            avatarPosition: 180,
            score: 0,
            showModal: false
        }

        this.range = this.range.bind(this);

    }


    GRAVITY = 5;
    JUMP = 100;


    //calcola l'area di gioco in altezza
    range(start, end) {
        if (start === end) return [start];
        return [start, ...this.range(start + 1, end)];
    }

    //determina se Ulisse è ancora vivo
    playableArea = () => {
        let windowHeight = window.innerHeight;
        let rangeY = this.range(106, windowHeight - 94);
    }


    //Event handlers

    //fa partire il gioco
    handleStartGame = () => {

        let obj = this.state;

        obj.isPlaying = true;
        obj.avatarPosition = 300;

        let schedulerScoreId = setInterval(() => {
            obj.score = obj.score + 1;
        }, 1000);

        //Scheduler che simula la gravità
        let schedulerGravityId = setInterval(() => {

            //Simulo la gravità
            // obj.avatarPosition = obj.avatarPosition + this.GRAVITY;

            //Controllo se l'avatar è ancora nella playable area: se non lo è, game over
            if ((106 > obj.avatarPosition) || (obj.avatarPosition > window.innerHeight - 94)) {
                // prima di resettare tutto salviamo per la classifica
                obj.isPlaying = false; //METTERE MODALE GAME OVER
                obj.avatarPosition = 180;
                obj.showModal = true;
                clearInterval(schedulerGravityId);
                clearInterval(schedulerScoreId)
            }


            this.setState(
                obj
            )

        }, 100);

        this.setState(
            obj
        )

    }

    jump = () => {


        console.log('position nello stato prima del salto:', this.state.avatarPosition);

        let obj = this.state;

        console.log('prima del salto:', obj.avatarPosition);

        //Simulo il salto
        obj.avatarPosition = obj.avatarPosition - this.JUMP;

        //Controllo se l'avatar è ancora nella playable area: se non lo è, game over
        if ((106 > obj.avatarPosition) || (obj.avatarPosition > window.innerHeight - 94)) {
            obj.isPlaying = false; //METTERE MODALE GAME OVER
            obj.avatarPosition = 180;
            obj.showModal = true;
        }


        console.log('dopo il salto:', obj.avatarPosition);

        this.setState(
            obj
        )

    }


    render() {
        return (
            <>

                {
                    this.state.showModal &&
                    <UiModal>You lose</UiModal>
                }

                {
                    !this.state.isPlaying &&
                    <div className="wanna-play-container">
                        <header>
                            <h1>Let's go!</h1>
                        </header>
                        <button onClick={this.handleStartGame}>
                            Start Game
                        </button>
                    </div>
                }

                {
                    this.state.isPlaying &&
                    <div>
                        <button>Ranking</button>
                        <div className="game-container" onClick={this.jump}>
                            <Odysseus positionY={this.state.avatarPosition} />
                            <p>{this.state.score}</p>
                        </div>
                    </div>
                }


            </>

        )

    }

}


export default Game;

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