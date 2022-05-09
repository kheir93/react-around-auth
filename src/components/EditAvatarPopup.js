import React, {useRef, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onOverlayClick, onUpdateAvatar}) {
  const [isValid, setIsValid] = useState(false);

  const inputError = document.querySelector(".form__input-error")

  // function handleAvatarField() {

  //   if (inputError != inputError.src) {
  //     return inputError.classList.add("form__input_type_error")
  //   }
  // }

  const avatarRef = useRef()

  //Submit updated avatar values//
  function handleSubmit(e) {
    e.preventDefault();
    //Value to pass to the external handler//
    onUpdateAvatar({
    avatar: avatarRef.current.value
  });
}

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} onOverlayClick={onOverlayClick} name="avatar" title="Change profile picture" buttonName="Save" submitValue="Submit">
      <label className="form__field">
        <input type="url" className="form__input form__input_avatar" ref={avatarRef} placeholder="Avatar image link" defaultValue="" name="avatar" required/>
        <span className="form__input-error">Please enter a web address.</span>
      </label>
    </PopupWithForm>
  );
}
