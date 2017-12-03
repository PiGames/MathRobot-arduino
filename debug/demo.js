import five from 'johnny-five';
const board = new five.Board();

import { opts } from '../src/setup.js';

import { clickOnXY, setup, goToXY } from '../src/coordinates.js';

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

  clickOnXY( 50, 130, () => {
    clickOnXY( 70, 130, () => {
      clickOnXY( 50, 130, () => {
        clickOnXY( 95, 150, () => {
          goToXY( 0, 0 );
        } );
      } );
    } );
  } );
} );
