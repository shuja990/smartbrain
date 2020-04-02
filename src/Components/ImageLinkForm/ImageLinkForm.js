import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
	return(
		<div className=''>
		  <p className='f3'>
		  	{'This Magic Brain will Detect Faces in Your Pictures. Give it a try'}
		  </p>
		  <div className='center'>
		  	<div className='pa4 form center br3 shadow-5'>
		  		<input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
		  		<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
		  	</div>
		  </div>
		</div>
		);
}
export default ImageLinkForm;