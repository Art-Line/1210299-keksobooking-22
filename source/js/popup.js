import { isEscEvent } from './util.js';

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const buttonClose = document.querySelector('.error__button');

const popup = (item, button) => {

  const modal = item.cloneNode(true);
  modal.style.zIndex = 9999;
  main.appendChild(modal);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeUserModal();
    }
  };

  const onModalClick = () => closeUserModal();

  const closeUserModal = () => {
    modal.classList.add('hidden');
    if (button) {
      button.removeEventListener('click', onModalClick);
    }
    modal.removeEventListener('click', onModalClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  if (button) {
    buttonClose.addEventListener('click', onModalClick);
  }
  modal.addEventListener('click', onModalClick);
  document.addEventListener('keydown', onPopupEscKeydown);

};

const successPopup = () => popup(successTemplate);
const errorPopup = () => popup(errorTemplate, buttonClose);

export { successPopup, errorPopup }
