import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <li className="places__item">
      <img className="places__photo" onClick={handleClick} src={card.link} alt={card.name} />
      <button className={isOwn ? 'places__trash' : 'places__trash_hidden'} onClick={handleDeleteClick} type="button" aria-label="Кнопка удалить"></button>
      <div className="places__info">
        <h2 className="places__title">{card.name}</h2>
        <div className="place__like-wrapper">
          <button className={`places__like ${isLiked && 'places__like_active'}`} onClick={handleLikeClick} type="button" aria-label="Лайк"></button>
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}
