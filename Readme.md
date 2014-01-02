Knockout Google-Maps Binding
========================


This repository contains a custom google maps Binding

*. Install via bower: `bower install knockout-googleMaps`
*. Or Download repository and use the dist/knockout-GoogleMaps module

Example
========================

Config require.js
-------------
    ```javascript
     requirejs.config({
                baseUrl: "",
                paths:{
                    'domReady' : 'components/requirejs-domready/domReady',
                    'async' : 'components/requirejs-plugins/async',
                    'knockout': 'components/knockout/knockout',
                    'knockout-GoogleMap' : 'knockout-GoogleMap'
                }
            });
    ```
Binding a Map
-------------
    ```html
        <div id="map" data-bind="googleMap: {address: 'Berlin, Germany', zoom: 13}"></div>
    ```