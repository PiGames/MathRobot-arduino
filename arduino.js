const five = require("johnny-five");
const board = new five.Board();

const { opts, motionOpts } = require("./setup.js");
const { loop, moveLeft, moveRight, click, moveToYMax, moveToYMin, moveToXMax, moveToXMin, unclick, clickDebug } = require("./motors.js")

let current_level = "bottom";
let i = 0;

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

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
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

        case "right": {
          if ( current_level === "top" ) {
            moveRight( stepperTop );
          } else if ( current_level === "bottom" ) {
            moveRight( stepperBottom );
            i++;
          }
          break;
        }

        case "left": {
          if ( current_level === "top" ) {
            moveLeft( stepperTop );
          } else if ( current_level === "bottom" ) {
            moveLeft( stepperBottom );
          }
          break;
        }

        case "b": {
          stepperBottom.step({
            steps: 100 * i,
            direction: 0,
          }, () => {});
        }

        default: {
          console.log( key );
        }
      }
    }
  });

});
