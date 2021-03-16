const filterForm = document.querySelector('.map__filters');
const filterFormElements = Array.from(filterForm.children);
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
//const housingFeatures = document.querySelectorAll('.map__feature');
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
    max: Infinity,
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

const filterAds = (item) => {

  const filterByTypes = () => {
    if (item.offer.type === housingType.value || housingType.value === 'any') {
      return item;
    }
  };

  const filterByRooms = () => {
    if (item.offer.rooms === parseInt(housingRooms.value) || housingRooms.value === 'any') {
      return item;
    }
  };

  const filterByGuests = () => {
    if (item.offer.guests === parseInt(housingGuests.value) || housingGuests.value === 'any') {
      return item;
    }
  };

  const filterByPrice = () => {
    if (housingPrice.value === 'any') {
      return item;
    } else {
      if (item.offer.price > filterPriceData[housingPrice.value].min && item.offer.price <= filterPriceData[housingPrice.value].max) {
        return item;
      }
    }
  };

  return filterByTypes() && filterByRooms() && filterByGuests() && filterByPrice();

};

export { enableFilter, setFilterChange, filterAds }
