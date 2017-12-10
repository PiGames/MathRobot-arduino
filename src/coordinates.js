let stepperTop;
let stepperBottom;
let servo;

const maxX = 4800;
const maxY = 7800;

const IS_PARALEL_MOVEMENT_ALLOWED = false;

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
  servo.to( 123 );
  setTimeout( () => {
    servo.to( 90 );

    setTimeout( cb, 700 );
  }, 500 );
};

const goToX = ( x, cb ) => {
  const dx = x - lastX;
  lastX = x;

  if ( Math.abs( dx ) > 0 ) {
    stepperBottom.step( {
      steps: Math.abs( dx ) / xRange * maxX,
      direction: ( Math.sign( dx ) === 1 ) ? 0 : 1,
    }, () => {
      cb();
    } );
  } else {
    cb();
  }
};

const goToY = ( y, cb ) => {
  const dy = y - lastY;
  lastY = y;

  if ( Math.abs( dy ) > 0 ) {
    stepperTop.step( {
      steps: Math.abs( dy ) / yRange * maxY,
      direction: ( Math.sign( dy ) === 1 ) ? 1 : 0,
    }, () => {
      cb();
    } );
  } else {
    cb();
  }
};

export const goToXY = ( x, y, cb = () => {} ) => {
  if ( IS_PARALEL_MOVEMENT_ALLOWED ) {
    let isDone = false;

    const callCb = () => {
      if ( !isDone ) {
        isDone = true;
        return;
      }

      cb();
    };

    goToX( x, callCb );
    goToY( y, callCb );
  } else {
    goToX( x, () => {
      goToY( y, cb );
    } );
  }
};



/* (0,0) */

export const clickOnXY = ( x, y, cb ) => {
  goToXY( x, y, () => {
    click( cb );
  } );
};
