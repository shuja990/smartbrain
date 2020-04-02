import React from 'react';
import './faceRecog.css';

const FaceRecog = ({imageURL,box}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
		 		<img id='image' alt='' src={imageURL} width='500px' height='auto'/>
		 		<div className='bounding-box' style={{top:box.topRow,right: box.rightCol,bottom: box.bottomRow, left: box.leftCol}}></div>
		 	</div>
		</div>
		);
}
export default FaceRecog;