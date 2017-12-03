let stepperTop;
let stepperBottom;
let servo;

const maxX = 4800;
const maxY = 7800;

const xRange = 100;
const yRange = 150;
/* X: 0-100 */
/* Y: 0-150 */
let lastX = 0;
let lastY = 0;

export const setup = ( _stepperTop, _stepperBottom, _servo ) => {
  stepperTop = _stepperTop;
  stepperBottom = _stepperBottom;
  servo = _servo;
};

const click = ( cb = () => {} ) => {
  servo.to( 153 );
  setTimeout( () => {
    servo.to( 121 );

    setTimeout( cb, 700 );
  }, 500 );
};

export const goToXY = ( x, y, cb = () => {} ) => {
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
  };

  if ( Math.abs( dx ) > 0 ) {
    stepperBottom.step( {
      steps: Math.abs( dx ) / xRange * maxX,
      direction: ( Math.sign( dx ) === 1 ) ? 1 : 0,
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
      direction: ( Math.sign( dy ) === 1 ) ? 0 : 1,
    }, () => {
      yDone = true;
      callCallback();
    } );
  } else {
    yDone = true;
    callCallback();
  }
};

/* (0,0) */

export const clickOnXY = ( x, y, cb ) => {
  goToXY( x, y, () => {
    console.log( 123 );
    click( cb );
  } );
};
