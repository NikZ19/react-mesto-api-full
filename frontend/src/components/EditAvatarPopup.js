import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';


export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const linkInput = React.useRef()

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: linkInput.current.value
    });
  };

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input ref={linkInput} className="popup__input" name="input_link" id="input-link-avatar" type="url" placeholder="Ссылка на картинку"
        required />
      <span className="popup__error" id="input-link-avatar-error"></span>
    </PopupWithForm>
  )
}
