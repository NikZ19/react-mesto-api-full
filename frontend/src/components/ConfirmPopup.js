import { PopupWithForm } from "./PopupWithForm/PopupWithForm";

export function ConfirmPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonTitle='Да'
      isOpen={isOpen}
      onClose={onClose} />
  )
}
