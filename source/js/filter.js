const FILTER_DEFAULT_VALUE = 'any';

const filterForm = document.querySelector('.map__filters');
const filterFormElements = Array.from(filterForm.children);
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

const filterPriceData = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Number.MAX_SAFE_INTEGER,
  },
};

const disableFilter = () => {
  filterForm.classList.add('map__filters--disabled');
  filterFormElements.forEach((item) => {
    item.disabled = true;
  });
};

disableFilter();

const enableFilter = () => {
  filterForm.classList.remove('map__filters--disabled');
  filterFormElements.forEach((item) => {
    item.disabled = false;
  });
};

const setFilterChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

const setFilterReset = (cb) => {
  filterForm.addEventListener('reset', () => {
    cb();
  });
};

const filterByTypes = (item) => {
  if (item.offer.type === housingType.value || housingType.value === FILTER_DEFAULT_VALUE) {
    return item;
  }
};

const filterByRooms = (item) => {
  if (item.offer.rooms === parseInt(housingRooms.value) || housingRooms.value === FILTER_DEFAULT_VALUE) {
    return item;
  }
};

const filterByGuests = (item) => {
  if (item.offer.guests === parseInt(housingGuests.value) || housingGuests.value === FILTER_DEFAULT_VALUE) {
    return item;
  }
};

const filterByPrice = (item) => {
  if (housingPrice.value === FILTER_DEFAULT_VALUE) {
    return item;
  } else {
    if (item.offer.price > filterPriceData[housingPrice.value].min && item.offer.price <= filterPriceData[housingPrice.value].max) {
      return item;
    }
  }
};

const filterByFeatures = (item) => {
  const housingFeaturesChecked = Array.from(housingFeatures.querySelectorAll('input:checked'));
  return housingFeaturesChecked.every((elem) => {
    return item.offer.features.includes(elem.value)
  });
};

const filterAds = (item) => {
  return filterByTypes(item) && filterByRooms(item) && filterByGuests(item) && filterByPrice(item) && filterByFeatures(item);
};

export { enableFilter, setFilterChange, filterAds, filterForm, setFilterReset }
