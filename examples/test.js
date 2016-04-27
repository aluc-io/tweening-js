var aniUC = require('../');

console.log('1. object to object test');
aniUC.from({ top: 0 }).to({ top: 200 }, { step: console.log, done: function() {

	console.log('');
	console.log('2. number to number test');
	aniUC.from( 0 ).to( 200, { step: console.log, done: function() {
	
		console.log('');
		console.log('3. number to -number test');
		aniUC.from( 30 ).to( -123, { step: console.log, done: function() {

			console.log('');
			console.log('4. -number to number test');
			aniUC.from( -30 ).to( 123, { step: console.log, done: function() {

				console.log('');
				console.log('5. -number to -number test');
				aniUC.from( -30 ).to( -123, { step: console.log });
			}});
		}});
	}});
}});

