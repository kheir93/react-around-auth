import React from 'react';

export default function AvatarModal() {

  return (
    <label className="form__field">
      <input type="url" className="form__input form__input_avatar" placeholder="Avatar image link" defaultValue="" name="avatar" required/>
      <span className="form__input-error inputAvatar-error">Please enter a web address.</span>
    </label>
  );
}
