
var aniUC = require('../animation-uc');

console.log('startstart');
aniUC.tween( document.getElementById('box'), { y: 400, x:200, opacity: 0.05 }, {
	duration: 5000,
	complete: function() {
		console.log('ok');
	}
});


setTimeout( function() {
	aniUC.tween( document.getElementById('box'), { y: 0, x:0, opacity: 1 }, {
		duration: 5000,
		complete: function() {
			console.log('ok2');
		}
	});
}, 2000 );
