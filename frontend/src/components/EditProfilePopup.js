import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { PopupWithForm } from './PopupWithForm.js';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });

  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input className="popup__input" value={name || ''} onChange={handleChangeName} name="input_name" id="input-name" type="text" placeholder="Имя" required
        minLength="2" maxLength="40" />
      <span className="popup__error" id="input-name-error"></span>
      <input className="popup__input" value={description || ''} onChange={handleChangeDescription} name="input_about" id="input-about" type="text" placeholder="Вид деятельности"
        required minLength="2" maxLength="200" />
      <span className="popup__error" id="input-about-error"></span>

    </PopupWithForm>
  )
}
