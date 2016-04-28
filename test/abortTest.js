var aniUC = require('../');

console.log('1. abort test while animating from 0 to 1000');

var handler = aniUC.from( 0 ).to( 1000, { 
	step: console.log,
	duration: 5000,
	ease: 'out-quad'
});

setTimeout( function() {
	handler.abort();
}, 1000 );


