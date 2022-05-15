import React from 'react';
import { Link } from 'react-router-dom'

const SignForm = ({ title, onChangePassword, onChangeEmail, authMode, authAction, password, email, link, onSubmit }) => {

  return (
    <form className='auth-modal' onSubmit={onSubmit}>
      <h2 className="auth-modal__title form__title_center">{title}</h2>
      <label className="auth-modal__field">
        <input type="email" id="email" className="auth-modal__input auth-modal__input_email" name="email" placeholder="Email" onChange={onChangeEmail} value={email}></input>
        <span className="auth-modal__input-error inputEmail-error">Please fill out this field.</span>
      </label>
      <label className="auth-modal__field">
        <input type="password" id="password" className="auth-modal__input auth-modal__input_password" name="password" placeholder="Password" onChange={onChangePassword} value={password}></input>
        <span className="auth-modal__input-error inputPassword-error">Please fill out this field.</span>
      </label>
      <button className="auth-modal__submit">{title}</button>
      <p className="auth-modal__status">{authMode}
        <Link to={link} className="auth-modal__status-link">{authAction}</Link>
      </p>

    </form>
  )
}

export default SignForm;
