export function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_photo-scale ${card.name && 'popup_opened'}`} >
      <div className="popup__photo-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
        <button className="popup__close-btn" onClick={onClose} id="close-fullsize" type="button" aria-label="Кнопка закрыть"></button>
      </div>
    </div>
  )
}
