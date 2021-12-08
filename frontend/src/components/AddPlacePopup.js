import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      title: title,
      link: link
    });
  }

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input className="popup__input" value={title} onChange={handleChangeTitle} name="input_title" id="input-title" type="text" placeholder="Название" required
        minLength="2" maxLength="30" />
      <span className="popup__error" id="input-title-error"></span>
      <input className="popup__input" value={link} onChange={handleChangeLink} name="input_link" id="input-link" type="url" placeholder="Ссылка на картинку"
        required />
      <span className="popup__error" id="input-link-error"></span>
    </PopupWithForm>
  )
}
