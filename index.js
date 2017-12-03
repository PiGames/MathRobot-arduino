// require( "./arduino.js" );

// const socket = require('socket.io-client').connect('http://172.20.10.6:4201')
const socket = require('socket.io-client').connect('http://localhost:4201')
socket.on('connect', () => {
  console.log( "Connected" );
  socket.on( "click", ( data ) => {
    console.log( "Click" + data );
    setTimeout( () => {
      socket.emit( "clicked" );
    }, 1000 );
  } );
})
