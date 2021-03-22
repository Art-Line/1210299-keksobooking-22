const ALERT_SHOW_TIME = 5000;

const getRandomFloat = (min, max, decimal) => {
  if (max > min && min >= 0) {
    return (Math.random() * (max - min) + min).toFixed(decimal);
  }
  throw new Error('Input data error');
};

const getRandom = (min, max) => getRandomFloat(min, max, 0);

const getRandomArrayElement = (array) => array[getRandom(0, array.length - 1)];

const getRandomArrayLength = (array) => array.slice(Math.floor(Math.random() * (array.length)));

const removeChildElements = (item) => {
  while (item.firstChild) {
    item.removeChild(item.firstChild);
  }
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomFloat, getRandom, getRandomArrayElement, getRandomArrayLength, removeChildElements, isEscEvent, showAlert }
