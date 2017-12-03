const five = require("johnny-five");
const board = new five.Board();

const { opts } = require("./setup.js");

const { clickOnXY, setup } = require("./coordinates.js");

board.on("ready", function() {
  const stepperTop = new five.Stepper({
    ...opts,
    pins: [ 2, 3, 5, 6 ],
  });

  const stepperBottom = new five.Stepper({
    ...opts,
    pins: [ 8, 9, 10, 11 ],
  });

  const servo = new five.Servo(12);

  setup( stepperTop, stepperBottom, servo );

  clickOnXY( 20, 25, () => {
    clickOnXY( 0, 0 );
  } );
} );
