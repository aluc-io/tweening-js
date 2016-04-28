[![npm version](https://img.shields.io/npm/v/animation-uc.svg?style=flat-square)](https://www.npmjs.com/package/animation-uc)
[![Build Status](https://travis-ci.org/b6pzeusbc54tvhw5jgpyw8pwz2x6gs/animation-uc.svg?branch=master)](https://travis-ci.org/b6pzeusbc54tvhw5jgpyw8pwz2x6gs/animation-uc)

# animation-uc
Light weight javascript library that for implementing animation using requestAnimationFrame with easing functions.

animation-uc does not support drawing dom element, it just call `step` function every requestAnimationFrame timing.

You have to implement `step` function and implement draw your world most beautiful dom animation. 

refer to below Usage.


## Usage 1

```javascript
var aniUC = require('animation-uc');

console.log('1. object to object test');
aniUC.from({ top: 0, left: 100 }).to({ top: 200, left: -50 }, { step: console.log, done: function() {

	console.log('');
	console.log('2. number to number test');
	aniUC.from( 0 ).to( 200, { step: console.log, ease: 'out-quad', done: function() {
	
		console.log('');
		console.log('3. number to -number test');
		aniUC.from( 30 ).to( -123, { step: console.log, ease: 'in-cube', done: function() {

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
```

Result is
```
1. object to object test
{ top: 1.9950000000000003, left: 98.50375 }
{ top: 16.63875, left: 87.5209375 }
{ top: 30.72, left: 76.96000000000001 }
{ top: 45.11999999999999, left: 66.16 }
{ top: 58.879999999999995, left: 55.84 }
{ top: 72.00000000000001, left: 45.99999999999999 }
{ top: 85.23875, left: 36.0709375 }
{ top: 96.32000000000001, left: 27.75999999999999 }
{ top: 107.52, left: 19.36 }
{ top: 118.08000000000001, left: 11.439999999999998 }
{ top: 128.59875, left: 3.550937499999989 }
{ top: 137.28, left: -2.960000000000008 }
{ top: 145.39875, left: -9.049062500000005 }
{ top: 153.92000000000002, left: -15.440000000000012 }
{ top: 161.71875, left: -21.2890625 }
{ top: 168, left: -26 }
{ top: 174.07999999999998, left: -30.560000000000002 }
{ top: 179.83874999999998, left: -34.879062499999975 }
{ top: 184.32, left: -38.24000000000001 }
{ top: 188.48, left: -41.360000000000014 }
{ top: 192, left: -44 }
{ top: 195.03875, left: -46.27906250000001 }
{ top: 197.12000000000003, left: -47.84000000000003 }
{ top: 198.72000000000003, left: -49.04000000000002 }
{ top: 199.67999999999998, left: -49.75999999999999 }
{ top: 199.99875, left: -49.99906250000001 }
{ top: 200, left: -50 }

2. number to number test
13.755
29.798750000000002
43.355000000000004
60.55500000000001
72.00000000000001
82.955
97.755
106.155
117.43875
127.39875
137.28
145.92000000000002
153.43874999999997
162.15499999999997
167.195
173.355
179.19875000000002
184.59875
187.99500000000003
192.39499999999998
194.55499999999998
196.99875
198.72000000000003
199.595
199.99499999999998
200

3. number to -number test
17.271356249999997
5.095424999999999
-5.189043749999996
-14.399643750000003
-25.080000000000005
-34.04484375
-44.782574999999994
-52.77204375000001
-59.84064375
-67.92000000000002
-75.872175
-82.81359375
-88.11504374999998
-93.71484375
-98.21304375
-103.44564374999999
-107.33279999999999
-111.21804374999999
-114.18719999999999
-117.03204374999999
-118.95984375000003
-120.976575
-122.02080000000004
-122.7552
-123

4. -number to number test
-17.271356249999997
-5.796356250000002
5.189043749999996
16.962393750000004
24.467043750000002
34.6272
44.234643750000004
51.73164375
59.348175
67.46004375
75.44664375
81.23004375
88.479375
93.71484375
97.90417500000001
102.61657499999998
107.57664374999999
110.572575
114.00264375
116.72604375
118.95984375000003
120.976575
122.02080000000004
122.78484375000002
122.99617499999997
123

5. -number to -number test
-37.737018750000004
-43.426875
-50.57101875
-58.158075
-63.480000000000004
-69.987675
-74.78880000000001
-79.99680000000001
-85.20421875
-89.52000000000001
-94.353675
-97.8528
-101.79541875
-104.9952
-107.93341875
-110.9472
-113.32741875
-115.57801875
-117.53101875
-119.37241875
-120.69301875
-121.82296875
-122.44141875000001
-122.86921875
-123
```

## Usage 2 : abort

```javascript
var handler = aniUC.from( 0 ).to( 1000, { 
	step: console.log,
	duration: 5000,
	ease: 'out-quad'
});

setTimeout( function() {
	handler.abort();
}, 1000 );
```



## Todo
1. Add Promise pattern


## dependencies
- ease-uc
- request-animation-frame-polyfill

## Special thanks
- https://gist.github.com/desandro/1866474
- https://github.com/component/ease
