/* global mapboxgl */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */

import popupComponent from "./components/popup";

import { getVisibleLayers, getFilteredLayers } from "./utils";
import {
  getLayerToggleHandler,
  getFilterToggleHandler,
  getShowAllHandler,
  getHideAllHandler,
  getFilterLayerToggleHandler
} from "./handlers";

import {
  MAP,
  ANIMATION_DURATION,
  ACCESS_TOKEN,
  LAYERS,
  LAYERS_ACTIVE
} from "./config";

mapboxgl.accessToken = ACCESS_TOKEN;

const DEFAULT_MAP = {
  container: "map"
};

export const handleInitialLoad = map => {
  Object.entries(LAYERS).forEach(([layerId]) =>
    toggleLayer(map, layerId, LAYERS_ACTIVE)
  );
  map.initialLoaded = true;
  map.layerList = map.getStyle().layers;

  map.visibleLayers = getVisibleLayers(map.layerList, false);
  map.filteredLayers = getFilteredLayers(map.layerList);
  // HANDLE MAP LOAD
  window.tcat.handleLayerToggle = getLayerToggleHandler(map);
  window.tcat.handleFilterToggle = getFilterToggleHandler(map);
  window.tcat.handleFilterLayerToggle = getFilterLayerToggleHandler(map);
  window.tcat.handleShowAll = getShowAllHandler(map, {
    layerList: map.layerList,
    filteredLayers: map.filteredLayers
  });
  window.tcat.handleHideAll = getHideAllHandler(map, {
    layerList: map.layerList,
    filteredLayers: map.filteredLayers
  });
};

export const toggleLayer = (map, layerId, isVisible = true) => {
  const visibility = isVisible ? "visible" : "none";
  map.setLayoutProperty(layerId, "visibility", visibility);
};

export function createCompass(map) {
  const leftEl = document.querySelector(".mapboxgl-ctrl-bottom-left");
  const compass = document.createElement("div");

  compass.innerHTML = `<div class="mapboxgl-ctrl mapboxgl-ctrl-group">
      <button class="mapboxgl-ctrl-icon mapboxgl-ctrl-compass" type="button" aria-label="Reset North"> 
      <span class="mapboxgl-ctrl-compass-arrow" style="transform: rotate(0deg);"></span> 
    </button> 
  </div>`;

  compass.onclick = () => {
    map.flyTo({
      center: DEFAULT_MAP.center
    });
  };
  leftEl.appendChild(compass);
}

export default function getMap() {
  const map = new mapboxgl.Map(
    // Set defaults, allow the config to override
    Object.assign(DEFAULT_MAP, MAP)
  );

  const popup = new mapboxgl.Popup();

  // Create a mapboxgl.Popup from the default popup component.
  const showPopup = feature => {
    popup
      .setLngLat(feature.geometry.coordinates)
      .setHTML(popupComponent(feature))
      .addTo(map);
    popup.on("close", () => {
      map.flyTo({
        center: DEFAULT_MAP.center,
        duration: ANIMATION_DURATION
      });
    });

    return popup;
  };

  // HANDLE MAP EVENTS

  Object.entries(LAYERS)
    .filter(([, layerConfig]) => layerConfig.hasPopups)
    .forEach(([layerId]) => {
      map.on("click", layerId, e => {
        const feature = e.features[0];
        setTimeout(() => {
          map.flyTo({
            center: feature.geometry.coordinates,
            duration: ANIMATION_DURATION
          });
          showPopup(feature);
        }, 200);
      });
    });

  //FULL SCREEN MODE
  map.addControl(new mapboxgl.FullscreenControl());
  // Add zoom conntrol
  const nav = new mapboxgl.NavigationControl({ showCompass: false });
  map.addControl(nav, "top-left");
  // disable scrollZoom
  map.scrollZoom.disable();
  createCompass(map);
  return map;
}
