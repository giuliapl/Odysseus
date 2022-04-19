import React, { Component, useState } from "react";
import './Game.css';

//Components
import Odysseus from "../../components/ui/hookComponents/odysseus/Odysseus";


class Game extends Component {

    constructor(props) {
        super(props)

        //[isPlaying, setIsPlaying] = useState(false);

        this.isPlaying = true;


    }

    range(start, end) {
        if (start === end) return [start];
        return [start, ...this.range(start + 1, end)];
    }

    //determina se Ulisse è ancora vivo
    playableArea = () => {
        let windowHeight = window.innerHeight;
        let rangeY = this.range(106, windowHeight - 94);
        console.log('window height:', windowHeight);
        console.log('rangeY:', rangeY);

    }

    render() {

        if (!this.isPlaying) {
            return (
                <>
                    bottone per iniziare a giocare
                </>
            )
        } else {
            return (
                <>
                    <div className="game-container" onClick={this.playableArea}>
                        <Odysseus positionY={200} />
                    </div>
                </>
            )
        }
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
------ se sulla y coincidono, game over
------ dopo tot secondi sposta la position a sinistra di totpx (translate-x)
------ quando arriva a x=0, show diventa false, image e position cambiano e delay viene riassegnato
--- image --> array di stringhe, scegli random
--- position
--- delay

- funzione x calcolo lunghezza totale dello schermo --> +n 
- funzione x calcolo altezza totale dello schermo --> range randomico per la posizione sull'asse delle y

*/