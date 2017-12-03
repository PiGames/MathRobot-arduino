import { rpi } from './io';

rpi.on( 'connect', () => {
  console.log( 'Connected to raspberry' );
} );

rpi.on( 'click', ( coords ) => {
  console.log( coords );
  setTimeout( () => {
    rpi.emit( 'clicked' );
  }, 2000 );
} );
