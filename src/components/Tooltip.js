import React from 'react';
import union from '../images/union.svg';
import obviouslyNotUnion from '../images/obviouslyNotUnion.svg'

const ToolTip = (onOverlayClick, unionStatus, isOpen, onClose) => {
  return (
    <div className={`popup tooltip-modal ${isOpen ? 'popup_open' : ''}`}>
      <div className="form">
        {/* <div className="form__title"> */}
          <img className="form__image" src={unionStatus ? union : obviouslyNotUnion} />
        {unionStatus ? <p className="form__title">Success! You have now been registered.</p> : <p className="form__title">Oops, something went wrong! Please try again</p>}
          <button className="modal__button" type="button" onClick={onClose}></button>
        {/* </div> */}
      </div>
    </div>
  )
}

export default ToolTip;
