const five = require("johnny-five");
const board = new five.Board();

const { opts, motionOpts } = require("./setup.js");
const { loop, moveLeft, moveRight } = require("./motors.js")

let current_level = "bottom";

board.on("ready", function() {
  const stepperTop = new five.Stepper({
    ...opts,
    pins: [ 2, 3, 5, 6 ],
  });

  const stepperBottom = new five.Stepper({
    ...opts,
    pins: [ 8, 9, 10, 11 ],
  });

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      switch (key.name) {
        case "up": {
          current_level = "top";

          console.log( "Current level is TOP" );
          break;
        }

        case "down": {
          current_level = "bottom";
          console.log( "Current level is BOTTOM" );
          break;
        }

        case "right": {
          if ( current_level === "top" ) {
            moveRight( stepperTop );
          } else if ( current_level === "bottom" ) {
            moveRight( stepperBottom );
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

        case "l": {
          loop( stepperTop, 0 );
          loop( stepperBottom, 0 );
        }
        default:
          console.log( key );
      }
    }
  });

});
