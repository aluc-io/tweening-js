var aniUC = require('../');
var easeUC = require('ease-uc');
var easeList = [];

for( var key in easeUC ) {

	if( key.indexOf( '-' ) < 0 ) continue;
	easeList.push( key );
}

console.log( easeList );
next();

function next( ease ) {
	ease = easeList.shift();
	if( ease ) draw( ease );
}

function draw( ease ) {

	console.log('');
	console.log('ease function:' + ease );
	aniUC.from( 0 ).to( 100, {
		step: console.log, ease: ease, done: next
	});
}
