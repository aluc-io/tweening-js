import React from 'react';
import ReactDOM from 'react-dom';

//import aniUC from 'animation-uc';
import aniUC from '../../index.js';

export class Popup extends React.Component {

	componentDidMount() {

		const newTop = 300;
		const dom = ReactDOM.findDOMNode( this );

		aniUC.from( 0 ).to( newTop, {
			step: top => ( dom.style.top = top + 'px' ), duration: 2000
		});
	}

	render() {

		const popupStyle = {
			width: '80%',
			top: 0,
			left: '10%',
			height: 200,
			position: 'absolute',
			backgroundColor: '#C2C2FF',
			color: 'white',
			textAlign: 'center',
			lineHeight: '200px',
			fontSize: 40
		};

		return (
			<div style={ popupStyle }>Hello animation-uc</div>
		);
	}
}

ReactDOM.render( <Popup />, document.body );
