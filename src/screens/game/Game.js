import React, { Component, useState } from "react";
import './Game.css';

//Components
import Odysseus from "../../components/ui/hookComponents/odysseus/Odysseus";


class Game extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isPlaying: false,
            avatarPosition: 180
        }

        this.range = this.range.bind(this);

    }

    GRAVITY = 15;


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


    componentWillUnmount() {
        clearInterval(this.fall);
        this.state = {
            isPlaying: false,
            avatarPosition: 180
        }
    }




    //Event handlers

    //fa partire il gioco
    handleStartGame = () => {

        let obj = this.state

        obj.isPlaying = true;
        obj.avatarPosition = 180;


        //Scheduler che simula la gravità
        this.fall = setInterval(() => {
            let obj = this.state;

            //Simulo la gravità
            obj.avatarPosition = obj.avatarPosition + this.GRAVITY;

            //Controllo se l'avatar è ancora nella playable area: se non lo è, game over
            if ((106 > obj.avatarPosition) || (obj.avatarPosition > window.innerHeight - 94)) {
                obj.isPlaying = false; //METTERE MODALE GAME OVER
            }

            this.setState(
                obj
            )

        }, 25);

        this.setState(
            obj
        )


    }


    render() {
        return (
            <>

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
                        <div className="game-container" onClick={this.playableArea}>
                            <Odysseus positionY={this.state.avatarPosition} />
                        </div>
                    </div>
                }
            </>

        )

        /*   if (this.state.isPlaying !== true) {
               return (
                   <>
                       <button onClick={this.handleStartGame}>
                           Start Game
                       </button>
                   </>
               )
           } else if (this.state.isPlaying === true) {
               return (
                   <>
                       <div className="game-container" onClick={this.playableArea}>
                           <Odysseus positionY={200} />
                       </div>
                   </>
               )
           }
           */
    }

}


export default Game;

/*

- div contenitore con sfondo in parallasse che si muove sull'asse delle x
--- componente <Odysseus> per gestire il personaggio che si sposta solo sull'asse delle y
--- componente <Obstacle> per gestire gli ostacoli che il personaggio deve evitare, che compaiono sull'asse delle x

- se Ulisse va troppo in su o troppo in giù, game over
- se Ulisse becca un ostacolo, game over
- se va tutto bene, il tempo continua a scorrere e quindi il punteggio si aggiorna


STATI:

- isPlaying
--- inizializzato a false
--- diventa true al click sul pulsante di start e fa partire il conteggio --> aggiorna counter con lo scheduler e lo rirenderizza nella barra in alto
--- counter inizializzato a 0
--- diventa false al gameover, ferma il conteggio, azzera counter, stoppa le animazioni, resetta gli ostacoli e la posizioni di Ulisse, e fa comparire la modale:
------ aggiorna la classifica tramite il localStorage

- characterPosition --> modifica la posizione css del personaggio
--- dopo tot secondi sposta la position del personaggio in giù di totpx
--- al click sul div contenitore sposta la position del personaggio in su di totpx
--- all'unmounting resetta lo scheduler

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
- funzione x calcolo altezza totale dello schermo --> range randomico per la posizione sull'asse delle y

*/