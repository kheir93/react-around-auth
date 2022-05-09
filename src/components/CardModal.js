import React from 'react';

export default function CardModal({placeholder}) {
  return (
    <div className='form'>
      <label className="form__field" >
        <input type="text" className="form__input form__input_title" placeholder={placeholder} defaultValue="" name="title" required minLength="2" maxLength="30"/>
        <span className="form__input-error inputTitle-error">Please fill out this field.</span>
      </label>
      <label className="form__field">
        <input type="url" className="form__input form__input_image" placeholder="Image link" defaultValue="" name="url" required/>
        <span className="form__input-error inputImage-error">Please enter a web address.</span>
      </label>
    </div>
  );
}
