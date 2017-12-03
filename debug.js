const five = require("johnny-five");
const board = new five.Board();
const { opts } = require("./setup.js");

const { moveLeft, moveRight, click, moveToYMax, moveToYMin, moveToXMax, moveToXMin, unclick, clickDebug } = require("./motors.js")

const { goToXY, setup } = require("./coordinates.js");

let x = 0;
let y = 0;
let isFree = true;
let type = "XY";

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

  const afterClick = () => {
    const obj = {
      x, y
    };

    console.log( JSON.stringify( obj ) );
    isFree = false;
    goToXY( x, y, () => { isFree = true; } );
  }

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      if ( isFree && type === "XY" ) {
        switch (key.name) {
          case "left": {
            if ( key.shift ) {
              x -= 1;
            } else {
              x -= 10;
            }

            afterClick();
            break;
          }

          case "right": {
            if ( key.shift ) {
              x += 1;
            } else {
              x += 10;
            }

            afterClick();
            break;
          }

          case "up": {
            if ( key.shift ) {
              y -= 1;
            } else {
              y -= 10;
            }

            afterClick();
            break;
          }

          case "down": {
            if ( key.shift ) {
              y += 1;
            } else {
              y += 10;
            }

            afterClick();
            break;
          }

          case "c": {
            if ( key.shift ) {
              unclick( servo );
            } else {
              click( servo );
            }
            break;
          }

          case "d": {
            clickDebug( servo );
            break;
          }

          case "t": {
            type = "motor";

            console.log( "You are now controlling servos" );
          }
        }
      } else {
        switch (key.name) {
          case "up": {
            moveRight( stepperTop );

            break;
          }

          case "down": {
            moveLeft( stepperTop );

            break;
          }

          case "right": {
            moveRight( stepperBottom );
            break;
          }

          case "left": {
            moveLeft( stepperBottom );
            break;
          }

          case "c": {
            if ( key.shift ) {
              unclick( servo );
            } else {
              click( servo );
            }
            break;
          }

          case "d": {
            clickDebug( servo );
            break;
          }

          case "t": {
            type = "XY";
            x = 0;
            y = 0;

            console.log( "You are now controlling XY" );
          }
        }
      }
    }
  })
});
