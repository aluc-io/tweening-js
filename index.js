
(function( factory ) {

	// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	// We use `self` instead of `window` for `WebWorker` support.
	var root = (typeof self == 'object' && self.self == self && self) ||
			(typeof global == 'object' && global.global == global && global);


	// Set up Backbone appropriately for the environment. Start with AMD.
	if (typeof define === 'function' && define.amd) {

		define(['request-animation-frame-polyfill', 'ease-uc', 'exports'],
		function( raf, easeUC, exports) {
			// Export global even in AMD case in case this script is loaded with
			// others that may still expect a global aniUC.
			root.aniUC = factory(root, exports, raf.raf, raf.caf, easeUC );
		});


	// Next for CommonJS.
	} else if (typeof exports === 'object' ) {

		var raf = require('request-animation-frame-polyfill');
		var easeUC = require('ease-uc');

		factory(root, exports, raf.raf, raf.caf, easeUC );


	// Finally, as a browser global.
	} else {
		root.aniUC = factory(root, {}, root.rafUC.raf, root.rafUC.caf, root.easeUC );
	}
	
}( function( root, exports, raf, caf, easeUC ) {

	// Save the previous value of the `Backbone` variable, so that it can be
	// restored later on, if `noConflict` is used.
	var previousAniUC = root.aniUC;
	exports.noConflict = function() {
		root.aniUC = previousAniUC;
		return this;
	};

	function AniUC( from ) {
		this.from = from;
	}

	var defaultOptions = {
		duration: 400,
		ease: 'out-quad'
	};

	AniUC.prototype.to = function( to, options ) {
		options = options || {};
		if( typeof options.step !== 'function' ) {
			console.error('options.step must be function');
			return;
		}

		var duration = options.duration;
		if( duration === undefined ) duration = defaultOptions.duration;

		var ease = options.ease;
		if( ease === undefined ) ease = defaultOptions.ease;
		if( ! easeUC[ ease ] ) {
			console.warn( 'not found  ease function: [' + ease + ']. so, default ease function is used' );
			ease = defaultOptions.ease;
		}

		var from = this.from;
		var step = options.step;
		var done = options.done;

		if( ! (
			( typeof from === 'number' && typeof to === 'number' ) || 
			( typeof from === 'object' && typeof to === 'object' )
		  )) {

			console.error("from and to are must be 'number','number' or 'object','object'");
			return;
		}

		if( typeof from === 'object' ) {
			for( var key in from ) {
				if( typeof to[ key ] === 'undefined' ) {
					console.error("from and to must have the same properties");
					return;
				}
				
				if( typeof from[ key ] !=='number' || typeof to[ key ] !=='number') {

					console.error("from and to object only have the number values");
					return;
				}
			}
		}

		var startTime = Date.now();
		var timer;
		function check() {

			var now = Date.now();

			if( now - startTime >= duration ) {
				// call step with last state
				step( to );
				if( done ) done();
				return;
			}

			var p = ( now - startTime ) / duration;
			var r = easeUC[ ease ]( p );

			step( updateState( from, to, r ) );

			timer = raf( check );
		}

		timer = raf( check );

		return {
			abort: function() {
				caf( timer );
			}
		};
	}

	exports.from = function( from ) {
		return new AniUC( from );
	}

	function updateNumber( from, to, r ) {
		return from + ( to - from ) * r;
	}

	function updateState( from, to, r ) {
		if( typeof from === 'object' ) {
			var newState = {};
			for( var key in from ) {
				newState[ key ] = updateNumber( from[key], to[key], r );
			}
			return newState;

		} else {

			return updateNumber( from, to, r );
		}
	}

	return exports;
}));
