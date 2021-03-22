import { sendData } from './api.js';
import { successPopup, errorPopup } from './popup.js';
import { setAddress, resetMainMarker } from './map.js';
import { resetAvatarImg, resetPhotoAdsImg } from './photo.js';
import { filterForm } from './filter.js';

const MAX_PRICE = 1000000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOMS_NUMBER = 100;
const typeToPriceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const formElements = Array.from(form.children);
const title = form.querySelector('#title');
const address = form.querySelector('#address');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const buttonReset = form.querySelector('.ad-form__reset');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formElements.forEach((item) => {
    item.disabled = true;
  });
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formElements.forEach((item) => {
    item.disabled = false;
  });
};

const validatePrice = () => {
  price.setAttribute('placeholder', typeToPriceMap[type.value]);
  price.setAttribute('min', typeToPriceMap[type.value]);
  price.setAttribute('max', MAX_PRICE);
};

const validateTimeIn = () => {
  timeOut.value = timeIn.value;
};

const validateTimeOut = () => {
  timeIn.value = timeOut.value;
};

const validateTitle = (item) => {
  const valueLength = item.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    item.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    item.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    item.setCustomValidity('');
  }
  item.reportValidity();
};

const validateRoomNumber = () => {
  if (parseInt(roomNumber.value) === MAX_ROOMS_NUMBER) {
    capacity.value = 0;
    Array.from(capacity.options).forEach(item => {
      item.disabled = parseInt(roomNumber.value) > parseInt(item.value) && parseInt(item.value) !== 0;
    });
  } else {
    capacity.value = roomNumber.value;
    Array.from(capacity.options).forEach(item => {
      item.disabled = parseInt(roomNumber.value) < parseInt(item.value) || parseInt(item.value) === 0;
    });
  }
};

type.addEventListener('change', () => validatePrice());
timeIn.addEventListener('change', () => validateTimeIn());
timeOut.addEventListener('change', () => validateTimeOut());
title.addEventListener('input', () => validateTitle(title));
roomNumber.addEventListener('change', () => validateRoomNumber());

const setAdFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => {
        successPopup(), form.reset(), filterForm.reset(), resetPhotoAdsImg(), resetAvatarImg(), setAddress(), validatePrice(), validateRoomNumber(), resetMainMarker()
      },
      () => errorPopup(),
      new FormData(evt.target),
    );
  });
};

const setAdFormReset = () => {
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    filterForm.reset();
    form.reset();
    resetPhotoAdsImg();
    resetAvatarImg();
    setAddress();
    validatePrice();
    validateRoomNumber();
    resetMainMarker();
  })
};

address.readOnly = true;
disableForm();
validatePrice();
validateRoomNumber();
setAdFormSubmit();
setAdFormReset();

export { address, enableForm };
