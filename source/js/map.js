/* global L:readonly */
import { address, enableForm } from './form.js';
import { enableFilter, filterAds } from './filter.js';
import { createCard } from './card.js';

const DEFAULT_LAT = 35.6817;
const DEFAULT_LNG = 139.75388;
const DEFAULT_SCALE = 9;
const PIN_SIZE = 40;
const MAIN_PIN_SIZE = 52;
const VISIBLE_ADS = 10;
const PIN_IMG = './img/pin.svg';
const MAIN_PIN_IMG = './img/main-pin.svg';

const centeredPin = (size) => size / 2;
const map = L.map('map-canvas');

const setAddress = () => {
  address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
};

const mapLoad = () => {
  map.on('load', () => {
    enableForm();
    setAddress();
  })
    .setView({
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    }, DEFAULT_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const setMainMarker = () => {

  const mainPinIcon = L.icon({
    iconUrl: MAIN_PIN_IMG,
    iconSize: [MAIN_PIN_SIZE, MAIN_PIN_SIZE],
    iconAnchor: [centeredPin(MAIN_PIN_SIZE), MAIN_PIN_SIZE],
  });

  const mainMarker = L.marker(
    {
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    const currentCoordinates = evt.target.getLatLng();
    const currentCoordinatesLat = currentCoordinates.lat.toFixed(5);
    const currentCoordinatesLng = currentCoordinates.lng.toFixed(5);
    address.value = `${currentCoordinatesLat}, ${currentCoordinatesLng}`;
  });

  return mainMarker;

};

const mainPin = setMainMarker();

const resetMainMarker = () => {
  mainPin.setLatLng([DEFAULT_LAT, DEFAULT_LNG]).update();
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);
  map.closePopup();
};

const layerMarkers = L.layerGroup().addTo(map);

const renderPinsOnMap = (adverts) => {
  enableFilter();
  const pinIcon = L.icon({
    iconUrl: PIN_IMG,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [centeredPin(PIN_SIZE), PIN_SIZE],
  });
  adverts
    .slice(0, VISIBLE_ADS)
    .forEach((item) => {
      let marker = L.marker(
        {
          lat: item.location.lat,
          lng: item.location.lng,
        },
        {
          icon: pinIcon,
        },
      );
      marker
        .addTo(layerMarkers)
        .bindPopup(
          createCard(item),
          {
            keepInView: true,
          },
        );
    });
};

const updatePinsOnMap = (adverts) => {
  layerMarkers.clearLayers();
  const filteredAdverts = adverts.filter(filterAds);
  renderPinsOnMap(filteredAdverts);
};

export { renderPinsOnMap, mapLoad, setAddress, setMainMarker, resetMainMarker, updatePinsOnMap }
