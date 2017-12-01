var five = require("johnny-five"),
    board = new five.Board();

board.on("ready", function() {
  const stepper = new five.Stepper({
    type: five.Stepper.TYPE.DRIVER,
    stepsPerRev: 48,
    pins: [ 8, 9, 10, 11 ],
    rpm: 500,
  });

  const stepper2 = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 48,
    pins: [ 8, 9, 10, 11 ],
    rpm: 500,
  });

  const loop = ( sptr, start = 1 ) => {
    sptr.step({ steps: 1000, direction: (start === 1) ? 1 : 0, accel: 0, decel: 0 }, function() {
      console.log("Done stepping!");
      sptr.step({ steps: 1000, direction: (start === 1) ? 0 : 1, accel: 0, decel: 0 }, function() {
        console.log("Done stepping!");
        loop( sptr );
      });
    });
  }

  loop( stepper, 1 );
  // loop( stepper2, 0 );
});
