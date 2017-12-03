const { motionOpts } = require("./setup.js");

const maxY = 7800;
const maxX = 4500;

/* X: 0-100 */
/* Y: 0-150 */
let lastX = 0;
let lastY = 0;

const goToXY = () => {

}



/* #### */
const dummy = () => {};

const click = ( srv ) => {
  srv.to( 160 );
}

const unclick = ( srv ) => {
  srv.to( 121 );
}

const clickDebug = ( srv ) => {
  srv.to( 140 );
}

const moveRight = ( stpr ) => {
  stpr.step({
    steps: 100,
    direction: 1,
  }, dummy);
}

const moveLeft = ( stpr ) => {
  stpr.step({
    steps: 100,
    direction: 0,
  }, dummy);
}

const moveToYMax = ( stpr ) => {
  stpr.step({
    steps: maxY,
    direction: 0,
  }, dummy);
}

const moveToYMin = ( stpr ) => {
  stpr.step({
    steps: maxY,
    direction: 1,
  }, dummy);
}


const moveToXMax = ( stpr ) => {
  stpr.step({
    steps: maxX,
    direction: 1,
  }, dummy);
}

const moveToXMin = ( stpr ) => {
  stpr.step({
    steps: maxX,
    direction: 0,
  }, dummy);
}




module.exports = {
  moveLeft,
  moveRight,
  click,
  unclick,
  moveToYMax,
  moveToYMin,
  moveToXMax,
  moveToXMin,
  clickDebug
}
