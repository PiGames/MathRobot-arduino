import five from 'johnny-five';
import { raspberry } from './io';
import { opts } from './setup.js';

import { clickOnXY, setup, goToXY } from './coordinates.js';

const board = new five.Board();

const rpi = raspberry.connect( process.env.RPI_URL );
let hardreset = false;

board.on( 'ready', function() {
  const stepperTop = new five.Stepper( {
    ...opts,
    pins: [ 2, 3, 5, 6 ],
  } );

  const stepperBottom = new five.Stepper( {
    ...opts,
    pins: [ 8, 9, 10, 11 ],
  } );

  const servo = new five.Servo( 12 );

  setup( stepperTop, stepperBottom, servo );

  process.stdin.on( 'keypress', ( str, key ) => {
    if ( key.ctrl && key.name === 'c' ) {
      if ( !hardreset ) {
        goToXY( 0, 0, process.exit );
        hardreset = true;
      } else {
        process.exit();
      }
    }
  } );

  rpi.on( 'connect', () => {
    console.log( 'Connected to raspberry' );
  } );

  rpi.on( 'click', ( { x, y } ) => {
    console.log( { x, y } );
    clickOnXY( x, y, () => {
      rpi.emit( 'clicked' );
    } );
  } );
} );
