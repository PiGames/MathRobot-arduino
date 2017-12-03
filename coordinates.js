const five = require("johnny-five");
const board = new five.Board();

const { opts, motionOpts } = require("./setup.js");

let stepperTop;
let stepperBottom;
let servo;
board.on("ready", function() {
  stepperTop = new five.Stepper({
    ...opts,
    pins: [ 2, 3, 5, 6 ],
  });

  stepperBottom = new five.Stepper({
    ...opts,
    pins: [ 8, 9, 10, 11 ],
  });

  servo = new five.Servo(12);

  const maxX = 4800;
  const maxY = 7800;

  const xRange = 100;
  const yRange = 150;
  /* X: 0-100 */
  /* Y: 0-150 */
  let lastX = 0;
  let lastY = 0;


  const click = ( cb = () => {} ) => {
    servo.to( 153 );
    setTimeout( () => {
      servo.to( 121 );

      setTimeout( cb, 700 );
    }, 500 );
  }

  const goToXY = ( x, y, cb = () => {} ) => {
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;
    let xDone = false;
    let yDone = false;

    const callCallback = () => {
      if ( xDone && yDone ) {
        cb();
      }
    }

    if ( Math.abs( dx ) > 0 ) {
      stepperBottom.step( {
        steps: Math.abs( dx ) / xRange * maxX,
        direction: (Math.sign( dx ) === 1) ? 1 : 0,
      }, () => {
        xDone = true;
        callCallback();
      } );
    } else {
      xDone = true;
      callCallback();
    }

    if ( Math.abs( dy ) > 0 ) {
      stepperTop.step( {
        steps: Math.abs( dy ) / yRange * maxY,
        direction: (Math.sign( dy ) === 1) ? 0 : 1,
      }, () => {
        yDone = true;
        callCallback();
      } );
    } else {
      yDone = true;
      callCallback();
    }
  }

  /* (0,0) */

  const clickOnXY = ( x, y, cb ) => {
    goToXY( x, y, () => {
      console.log( 123 );
      click( cb );
    } )
  }

  clickOnXY( 20, 25, () => {
    clickOnXY( 0, 0 );
  } );
} );
