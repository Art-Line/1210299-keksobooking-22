/* global _:readonly */
import './form.js';
import './photo.js';
import './filter.js';
import { getData } from './api.js';
import { mapLoad, renderPinsOnMap, updatePinsOnMap } from './map.js';
import { showAlert } from './util.js';
import { setFilterChange, setFilterReset } from './filter.js';

const RERENDER_DELAY = 500;

mapLoad();

getData(
  (ads) => {
    renderPinsOnMap(ads);
    setFilterReset(_.debounce(
      () => updatePinsOnMap(ads),
      RERENDER_DELAY,
    ));
    setFilterChange(_.debounce(
      () => updatePinsOnMap(ads),
      RERENDER_DELAY,
    ));
  },
  () => showAlert('Ошибка загрузки данных'),
);
