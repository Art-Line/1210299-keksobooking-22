import './form.js';
import './filter.js';
import { getData } from './api.js';
import { mapLoad, renderPinsOnMap, updatePinsOnMap } from './map.js';
import { showAlert } from './util.js';
import { setFilterChange } from './filter.js';

mapLoad();

getData(
  (ads) => {
    renderPinsOnMap(ads);
    setFilterChange(() => updatePinsOnMap(ads));
  },
  () => showAlert('Ошибка загрузки данных'),
);
