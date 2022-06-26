import React from 'react';
import { Spinner } from 'react-bootstrap';

import './loader.css';

function Loader() {
  return (
    <div className="loader-main">
      <div className="loader">
        <div className="loader__filmstrip">
        </div>
        <p className="loader__text">
          loading
        </p>
      </div>
    </div>


//     <Spinner 
//       animation='border' 
//       role='status' 
//       style={{
//         height: '100px',
//         width: '100px',
//         margin: 'auto',
//         display: 'block'
//       }}
//     >
//       <span className='sr-only'>Loading...</span>
//     </Spinner>
  )
}

export default Loader