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

const centeredPin = (size) => size / 2;
const map = L.map('map-canvas');

//  setAddress
const setAddress = () => {
  address.value = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;
};

//  mapLoad
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

//  setMainMarker
const setMainMarker = () => {

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
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

// setMainMarker start & retun marker for resetMainMarker
const mainPin = setMainMarker();

//  resetMainMarker
const resetMainMarker = () => {
  mainPin.setLatLng([DEFAULT_LAT, DEFAULT_LNG]).update();
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);
  map.closePopup();
};


const layerMarkers = L.layerGroup().addTo(map);

//  renderPinsOnMap
const renderPinsOnMap = (adverts) => {

  enableFilter();
  //layerMarkers.clearLayers();

  const pinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [centeredPin(PIN_SIZE), PIN_SIZE],
  });
  adverts
    //.filter(filterAds)
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
  const filteredAdverts = adverts.slice(0, VISIBLE_ADS).filter(filterAds);
  renderPinsOnMap(filteredAdverts);
};


export { renderPinsOnMap, mapLoad, setAddress, setMainMarker, resetMainMarker, updatePinsOnMap }
