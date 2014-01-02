/*
@autor:       Stefan Bieliauskas, Thomas Welton (Github: requirejs-google-maps )
@decription:  Ko. binding to display an adress on a googleMap
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["require", 'knockout', "async!http://maps.google.com/maps/api/js?sensor=true!callback"], function(require, ko, unused) {
    var GoogleMap, google;
    google = window.google;
    GoogleMap = (function(_super) {
      __extends(GoogleMap, _super);

      function GoogleMap(el, options) {
        var defaultOptions, key, val;
        this.el = el;
        this.options = options != null ? options : {};
        this.addMarkerImage = __bind(this.addMarkerImage, this);
        this.geocodeAddress = __bind(this.geocodeAddress, this);
        this.centerToAdress = __bind(this.centerToAdress, this);
        this.addMarker = __bind(this.addMarker, this);
        this.panBy = __bind(this.panBy, this);
        this.addEvent = __bind(this.addEvent, this);
        defaultOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        if (this.options.address) {
          this.geocodeAddress(this.options.address);
        }
        for (key in defaultOptions) {
          val = defaultOptions[key];
          if (!this.options[key]) {
            this.options[key] = val;
          }
        }
        GoogleMap.__super__.constructor.call(this, this.el, this.options);
      }

      GoogleMap.prototype.addEvent = function(evt, callback) {
        switch (evt) {
          case "loaded":
            return google.maps.event.addListenerOnce(this, 'tilesloaded', callback);
          default:
            return google.maps.event.addListener(this, evt, callback);
        }
      };

      GoogleMap.prototype.panBy = function(x, y) {
        if ((x == null) || (y == null)) {
          return console.warn('Both x and y coordinated need to be defined');
        }
        return GoogleMap.__super__.panBy.call(this, x, y);
      };

      GoogleMap.prototype.addMarker = function(position) {
        var marker;
        if (position == null) {
          position = this.options.center;
        }
        return marker = new google.maps.Marker({
          position: position,
          map: this
        });
      };

      GoogleMap.prototype.centerToAdress = function(address) {
        var self;
        self = this;
        return this.geocodeAddress(address, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            self.setCenter(results[0].geometry.location);
            return self.addMarker(self.getCenter());
          }
        });
      };

      GoogleMap.prototype.geocodeAddress = function(address, callback) {
        var geocoder, self;
        self = this;
        geocoder = new google.maps.Geocoder();
        return geocoder.geocode({
          'address': address
        }, callback);
      };

      GoogleMap.prototype.addMarkerImage = function(image, position) {
        var icon, marker;
        marker = this.addMarker(position);
        icon = {
          url: image.url
        };
        if (image.size != null) {
          icon.size = new google.maps.Size(image.size[0], image.size[1]);
        }
        if (image.origin != null) {
          icon.origin = new google.maps.Point(image.origin[0], image.origin[1]);
        }
        if (image.anchor != null) {
          icon.anchor = new google.maps.Point(image.anchor[0], image.anchor[1]);
        }
        marker.setIcon(icon);
        return marker;
      };

      return GoogleMap;

    })(google.maps.Map);
    return ko.bindingHandlers.googleMap = {
      init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var values;
        values = valueAccessor();
        element.map = new GoogleMap(element);
        if (values.address) {
          element.map.centerToAdress(ko.utils.unwrapObservable(values.address));
        }
        if (values.zoom) {
          element.map.setZoom(ko.utils.unwrapObservable(values.zoom));
        }
      },
      update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var values;
        values = valueAccessor();
        if (values.address) {
          element.map.centerToAdress(ko.utils.unwrapObservable(values.address));
        }
      }
    };
  });

}).call(this);
