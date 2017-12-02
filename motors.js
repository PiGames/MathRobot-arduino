const { motionOpts } = require("./setup.js");

const moveRight = ( stpr ) => {
  stpr.step({
    steps: 100,
    direction: 1,
  }, () => {});
}

const moveLeft = ( stpr ) => {
  stpr.step({
    steps: 100,
    direction: 0,
  }, () => {});
}

const loop = ( sptr, start = 1 ) => {
  sptr.step({
    ...motionOpts,
    direction: (start === 1) ? 1 : 0
  }, function() {
    console.log("Done stepping!");
    sptr.step({
      ...motionOpts,
      direction: (start === 1) ? 0 : 1
    }, function() {
      console.log("Done stepping!");
      loop( sptr );
    });
  });
}


module.exports = {
  moveLeft,
  moveRight,
  loop
}
