import React from 'react';
import { Link } from 'react-router-dom'

const SignForm = ({ title, handleChange, authMode, authAction, email, password, link, onSubmit }) => {

  return (
    <form className='form form_dark' onSubmit={onSubmit}>
      <h2 className="form__title form__title_center">{title}</h2>
      <label className="form__field">
        <input type="email" className="form__input form__input_createEmail" id="email" name="email" placeholder="Email" onChange={handleChange} value={email}></input>
        <span className="form__input-error inputCreateEmail-error">Please fill out this field.</span>
      </label>
      <label>
        <input type="password" className="sign-form__input" id="password" name="password" placeholder="Password" onChange={handleChange} value={password}></input>
        <span className="form__input-error inputCreatePassword-error">Please fill out this field.</span>
      </label>
      <button className="sign-form__submit">{title}</button>
      <p className="auth-modal__status">{authMode}
        <Link to={link} className="auth-modal__status-link">{authAction}</Link>
      </p>

    </form>
  )
}

export default SignForm;
