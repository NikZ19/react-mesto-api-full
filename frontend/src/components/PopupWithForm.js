
export function PopupWithForm({ name, title, buttonTitle, children, isOpen, onClose, onSubmit }) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" onSubmit={onSubmit} name={`form_${name}`}>
          {children}
          <button className="popup__save-btn" name="submit_btn_edit" type="submit"
            aria-label="Кнопка сохранить">{buttonTitle}</button>
        </form>
        <button className="popup__close-btn" id={`close-${name}`} onClick={onClose} type="button" aria-label="Кнопка закрыть"></button>
      </div>
    </div>
  )
}
