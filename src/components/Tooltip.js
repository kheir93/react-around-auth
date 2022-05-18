import React from 'react';
import union from '../images/union.svg';
import obviouslyNotUnion from '../images/obviouslyNotUnion.svg'

const ToolTip = ({ onOverlayClick, unionStatus, isOpen, onClose }) => {
  return (
    <div className={`popup tooltip-modal ${isOpen ? 'popup_open' : ''}`} onClick={onOverlayClick}>
      <div className="form" >
        {/* <div className="form__title"> */}
        <img className="form__image" src={unionStatus ? union : obviouslyNotUnion} />
        {unionStatus ? <p className="form__title form__title_center">Success! You have now been registered.</p> : <p className="form__title form__title_center">Oops, something went wrong! Please try again.</p>}
          <button className="form__close"  type="button" onClick={onClose}></button>
        {/* </div> */}
      </div>
    </div>
  )
}

export default ToolTip;
