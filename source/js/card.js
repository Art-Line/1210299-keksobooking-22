import { removeChildElements } from './util.js';

const NUMBER_ONE = 1;
const NUMBER_TWO = 2;
const NUMBER_FOUR = 4;
const NUMBER_TEN = 10;
const NUMBER_TWENTY = 20;

const propertyToTypesMap = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
};
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const addTextContent = (place, elem, objField, text) => {
  const item = place.querySelector(elem);
  if (objField) {
    if (text) {
      return item.textContent = objField + text;
    }
    return item.textContent = objField;
  }
  return place.removeChild(item);
};

const addAvatar = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    return item.src = objField;
  }
  return place.removeChild(item);
};

const addType = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    return item.textContent = propertyToTypesMap[objField];
  }
  return place.removeChild(item);
};

const addFeatures = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    removeChildElements(item);
    objField.forEach((objItem) => {
      const createElem = `<li class="popup__feature popup__feature--${objItem}"></li>`
      item.insertAdjacentHTML('beforeend', createElem);
    });
    return;
  }
  return place.removeChild(item);
};

const addPhotos = (place, elem, objField) => {
  const item = place.querySelector(elem);
  if (objField) {
    removeChildElements(item);
    objField.forEach((objItem) => {
      const createElem = `<img src="${objItem}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      item.insertAdjacentHTML('beforeend', createElem);
    });
    return;
  }
  return place.removeChild(item);
};

const addTime = (place, elem, checkin, checkout) => {
  const item = place.querySelector(elem);
  if (checkin && checkout) {
    return item.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin) {
    return item.textContent = `Заезд после ${checkin}`;
  } else if (checkout) {
    return item.textContent = `Выезд до ${checkout}`;
  }
  return place.removeChild(item);
};

const addCapacity = (place, elem, objRooms, objGuests) => {
  const item = place.querySelector(elem);
  const lastSymbol = parseInt(objRooms.toString().slice(-1));
  const penultSymbol = parseInt(objRooms.toString().slice(-2, -1));
  const lastTwoSymbols = parseInt(objRooms.toString().slice(-2));
  let summaSymbols = 0;
  if (penultSymbol) {
    summaSymbols = lastSymbol + penultSymbol;
  }
  let textRoom = 'комнат';
  if (lastSymbol === NUMBER_ONE && summaSymbols !== NUMBER_TWO) {
    textRoom = 'комната';
  } else if (lastSymbol >= NUMBER_TWO && lastSymbol <= NUMBER_FOUR && !(lastTwoSymbols >= NUMBER_TEN && lastTwoSymbols <= NUMBER_TWENTY)) {
    textRoom = 'комнаты';
  }
  if (objRooms && objGuests) {
    return item.textContent = `${objRooms} ${textRoom} для ${objGuests} гостей`;
  } else if (objRooms) {
    return item.textContent = `${objRooms} ${textRoom}`;
  } else if (objGuests) {
    return item.textContent = `Для ${objGuests} гостей`;
  }
  return place.removeChild(item);
};

const createCard = (obj) => {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  addTextContent(cardTemplateClone, '.popup__title', obj.offer.title);
  addTextContent(cardTemplateClone, '.popup__text--address', obj.offer.address);
  addTextContent(cardTemplateClone, '.popup__description', obj.offer.description);
  addTextContent(cardTemplateClone, '.popup__text--price', obj.offer.price, ' ₽/ночь');
  addAvatar(cardTemplateClone, '.popup__avatar', obj.author.avatar);
  addType(cardTemplateClone, '.popup__type', obj.offer.type);
  addFeatures(cardTemplateClone, '.popup__features', obj.offer.features);
  addCapacity(cardTemplateClone, '.popup__text--capacity', obj.offer.rooms, obj.offer.guests);
  addTime(cardTemplateClone, '.popup__text--time', obj.offer.checkin, obj.offer.checkout);
  addPhotos(cardTemplateClone, '.popup__photos', obj.offer.photos);
  return cardTemplateClone;
};

export { createCard }
