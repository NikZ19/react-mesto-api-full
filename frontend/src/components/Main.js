import React from "react";
import { Card } from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


export function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content root__container">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} type="button" aria-label="Кнопка редактирования аватара"></button>
          <div className="profile__text">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-btn" onClick={onEditProfile} type="button" aria-label="Кнопка редактирования профиля"></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" onClick={onAddPlace} type="submit" aria-label="Кнопка добавления новой карточки"></button>
      </section>
      <section className="places">
        <ul className="places__items">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          )
          )}
        </ul>
      </section>
    </main>
  )
}
