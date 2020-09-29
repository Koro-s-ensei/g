import React from 'react';

import './modal.css';
const Modal = props => {
     
     const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };
     function closeModal(e) {
        e.stopPropagation()
        props.closeModal()
     }
     return (
       <div 
         className="modal"
         onClick={ closeModal }
         style={divStyle} >
          <div 
             className="modal-content"
             onClick={ e => e.stopPropagation() } >
			 
             <span 
                 className="close"
                 onClick={ closeModal }>&times;
             </span>
			  <video width="100%" height="90%" controls >
				<source src="http://panel.telly.network/api/upload/video/1595437190_1810883703.mp4" type="video/mp4"/>
			</video>
          </div>
		 
       </div>
		
     );
}
export default Modal;