
//* PATRON MODULO
/*

(()=>{

})();

*/
//* 'use strict': le dice a JS que analice el codigo estrictamente

const miModulo = (()=>{
    'use strict'
    /*
    2C = two of clubs (Treboles)
    2D = two of Diamonds (Diamantes)
    2H = two of hearts (Corazones)
    2S = two of spades (Espadas)
    */ 

    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];
    
    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];
    
    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');
    
    
    // esta función inicializa el juego
    
    const inicializarJuego = (numJugadores = 2)=>{
      deck = crearDeck();
      puntosJugadores = [];
       for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
       };
    
       puntosHTML.forEach(elem => elem.innerText = 0) //forEach va a reiniciar los valores
       divCartasJugadores.forEach(elem => elem.innerHTML = '') //forEach va a reiniciar los campos

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    }
    

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        deck = [];

        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo);
            }
        }
    
        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }

        return _.shuffle( deck );
    }
    
    
    // Esta función me permite tomar una carta
    const pedirCarta = () => {
    
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }
    
    // pedirCarta();
    const valorCarta = ( carta ) => {
    
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }
    
    //turno: 0 = primer jugador y el ultimo será la computadora
    const acomularPuntos = (carta, turno)=>{ //turno va a tomar la posición del jugador
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };


    const crearCarta = (carta,turno)=>{

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = ()=>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 700 );
    }

    //todo                     TURNO DE LA COMPUTADORA
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();//carta sin converción (2D)
            puntosComputadora = acomularPuntos(carta, puntosJugadores.length -1); //estos dos valores son los parametros que pide la función acomularPuntos
            crearCarta(carta, puntosJugadores.length -1);
    
        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );
    
        determinarGanador();
    }
    
    
    
    // Eventos
    btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
        
        const puntosJugador = acomularPuntos(carta, 0); //estos dos valores son los parametros que pide la función acomularPuntos
        crearCarta(carta, 0);

        // puntosJugador = puntosJugador + valorCarta( carta );
        // puntosHTML[0].innerText = puntosJugador;
        
    
        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
    
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
    
    });
    
    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
    
        turnoComputadora( puntosJugadores[0] );
    });
    
    // btnNuevo.addEventListener('click', () => {
    
    //     inicializarJuego();
    
    // });

    return {
        nuevoJuego: inicializarJuego
    }
})();






