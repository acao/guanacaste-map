parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={style:"mapbox://styles/guanacaste/cjj079axn0aqu2so55fx6ln2x",center:[-85.61365526723557,10.838261234356153],zoom:9.619976883678385},s="pk.eyJ1IjoiZ3VhbmFjYXN0ZSIsImEiOiJjamowNzhuYnAwZXU2M2txczhsc21mbDVsIn0.amJMu3O1jfjcbg-B1qC7ww",o={LAYER_ID:"toggle-turismo",SOURCE_LAYER:"Turismo",ANIMATION_DURATION:2e3,LEGEND_TITLE:"Puestos Estaciónes y Tourismos",ACCESS_TOKEN:s,MAP:e,SOURCE_TYPES:[{name:"biological",layerId:"toggle-turismo",label:"Biological",icon:'<svg><use href="assets/svg/information-11.svg"></use></svg>'},{layerId:"toggle-turismo",name:"tourist",label:"Touristo"}],LAYERS:{"toggle-turismo":{label:"Turismo",color:"#CCCC00"},"toggle-unesco":{label:"UNESCO",color:"#CCCC00",shape:"line"},"toggle-sectores":{label:"Sectores",color:"#449438",shape:"square"},"toggle-ecosistemas":{label:"Ecosistemas",color:"#000000",shape:"square"}}};exports.default=o;
},{}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(n){return'<div class="popup-header">\n    <h3>\n        <a\n          href="'+n.properties.link+'"\n          >\n          '+n.properties.Estación+'\n        </a>\n    </h3>\n    <div class="popup-image">\n        <a\n          href="'+n.properties.link+'"\n          >\n          <img\n            src="'+n.properties.Image+'"\n            alt="Image del Estación '+n.properties.Estación+'"\n          />\n        </a>\n      \n    </div>\n  </div>\n  <div class="popup-content">\n    <div class="popup-description">\n      <p>'+n.properties.description+'</p>\n    </div>\n    <a\n      class="popup-button"\n      href="'+n.properties.link+'"\n      >\n      Más informacíon\n    </a>\n  </div>\n  '};
},{}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(e){return'<div>\n\t    <h4 class="overlay-box">Puestos Estaciónes y Tourismos</h4>\n\t\t\t<div id="legend-items" class="overlay-box">\n          '+e.map(function(e){return'<div class="legend-item active" id="'+e.name+'" onClick="handleFilter(\''+e.name+"', '"+(e.type||"symbol")+"', "+(e.layerId?"'"+e.layerId+"'":null)+')">\n                  <span class="legend-key" style="background-color: '+e.color+'"></span>\n                  <span class="label">'+e.label+"</span>\n                </div>"}).join("")+'\n\n\t\t\t</div>\n      <div id="legend-footer" class="overlay-box">\n        <div onClick="noFilter()">Ver Todas las Capas</div>\n      </div>\n\t</div>'};
},{}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getVisibleLayers=void 0;var e=require("./config"),r=t(e);function t(e){return e&&e.__esModule?e:{default:e}}function i(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var n=r.default.SOURCE_TYPES,u=exports.getVisibleLayers=function(e){return e.filter(function(e){return"toggle-"===e.id.substring(0,7)}).reduce(function(e,r){var t=i({},r.id,!0);return"toggle-turismo"===r.id&&(t[r.id]=n.filter(function(e){return e.layerId===r.id}).reduce(function(e,r){var t=r.name;return Object.assign(i({},t,!0),e)},{})),Object.assign(t,e)},{})};
},{"./config":4}],6:[function(require,module,exports) {

},{"./../svg/park-11.svg":[["park-11.a1b963bc.svg",19],19]}],2:[function(require,module,exports) {
"use strict";var e=require("./config"),t=i(e),n=require("./components/popup"),o=i(n),r=require("./components/legend"),l=i(r),a=require("./utils");function i(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}require("../assets/styles/index.scss");var u=t.default.ACCESS_TOKEN,c=t.default.MAP,d=t.default.LAYER_ID,m=t.default.ANIMATION_DURATION,y=t.default.SOURCE_TYPES,g=t.default.LAYERS,f={container:"map"};mapboxgl.accessToken=u;var p=new mapboxgl.Map(Object.assign(f,c));window.map=p;var b=new mapboxgl.Popup,v=function(e){return b.setLngLat(e.geometry.coordinates).setHTML((0,o.default)(e)).addTo(p),b.on("close",function(){p.flyTo({center:f.center,duration:m})}),b};function L(){var e=document.querySelector(".mapboxgl-ctrl-bottom-left"),t=document.createElement("div");t.innerHTML='<div class="mapboxgl-ctrl mapboxgl-ctrl-group">\n      <button class="mapboxgl-ctrl-icon mapboxgl-ctrl-compass" type="button" aria-label="Reset North">\u2028\n      <span class="mapboxgl-ctrl-compass-arrow" style="transform: rotate(0deg);"></span>\u2028\n    </button>\u2028\n  </div>',t.onclick=function(){p.flyTo({center:f.center})},e.appendChild(t)}p.on("click",d,function(e){var t=e.features[0];setTimeout(function(){p.flyTo({center:t.geometry.coordinates,duration:m}),v(t)},200)}),p.addControl(new mapboxgl.FullscreenControl);var T={};p.on("load",function(){var e=new mapboxgl.NavigationControl({showCompass:!1});p.addControl(e,"top-left"),p.scrollZoom.disable(),L();var t=p.getStyle().layers;T=(0,a.getVisibleLayers)(t);var n=t.filter(function(e){var t=e.id;return"toggle-"===t.substring(0,7)&&"toggle-turismo"!==t}).map(function(e){return{name:e.id,label:g[e.id]?g[e.id].label:e.id.substring(7),type:"layer",color:g[e.id]?g[e.id].color:"darkgrey"}});document.getElementById("legend").innerHTML=(0,l.default)([].concat(s(y),s(n))),window.handleFilter=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(document.getElementById(e).classList.toggle("active"),"symbol"===t&&n){T[n][e]=!T[n][e];var o=Object.keys(T[n]).filter(function(e){return T[n][e]});return o.length>0&&p.setLayoutProperty(n,"visibility","visible"),o.length>1?p.setFilter(n,["in","symbol"].concat(s(o))):1===o.length?p.setFilter(n,["==","symbol",o[0]]):p.setLayoutProperty(n,"visibility","none")}T[e]=!T[e];var r=T[e];p.setLayoutProperty(e,"visibility",r?"visible":"none")},window.noFilter=function(){n.map(function(e){return p.setLayoutProperty(e.name,"visibility","visible")}),n.map(function(e){var t=e.name;return p.setFilter(t,null)}),T=(0,a.getVisibleLayers)(p.getStyle().layers),document.getElementById("legend").innerHTML=(0,l.default)([].concat(s(y),s(n)))}}),document.body.addEventListener("keydown",function(e){var t=e.metaKey,n=e.ctrlKey;(t||n)&&p.scrollZoom.enable()}),document.body.addEventListener("keyup",function(e){var t=e.metaKey,n=e.ctrlKey;(t||n)&&p.scrollZoom.disable()});
},{"./config":4,"./components/popup":13,"./components/legend":8,"./utils":5,"../assets/styles/index.scss":6}]},{},[2], null)
//# sourceMappingURL=/guanacaste-map/src.bc7a0ea2.map