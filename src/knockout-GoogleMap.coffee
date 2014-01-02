###
@autor:       Stefan Bieliauskas, Thomas Welton (Github: requirejs-google-maps )
@decription:  Ko. binding to display an adress on a googleMap

###
define ["require", 'knockout',"async!http://maps.google.com/maps/api/js?sensor=true!callback"], (require, ko, unused) ->
  google = window.google
  class GoogleMap extends google.maps.Map
    constructor: (@el, @options = {}) ->
      defaultOptions =
        center: new google.maps.LatLng 0, 0
        zoom: 2
        mapTypeId: google.maps.MapTypeId.ROADMAP
      if  @options.address
        this.geocodeAddress(@options.address)

      # Merge options
      for key, val of defaultOptions
        @options[key] = val if !@options[key]

      super(@el, @options)

    addEvent: (evt, callback) =>
      switch evt
        when "loaded"
          google.maps.event.addListenerOnce this, 'tilesloaded', callback
        else
          google.maps.event.addListener this, evt, callback

    panBy: (x, y) =>
      ##Gmaps throws "Maximum call stack size exceeded" if x or not not defined
      return console.warn('Both x and y coordinated need to be defined') if !x? or !y?
      super(x, y)

    addMarker: (position = @options.center) =>
      marker = new google.maps.Marker
        position: position
        map: this

    centerToAdress:(address)=>
      self = @
      this.geocodeAddress address, (results, status) ->
        if (status == google.maps.GeocoderStatus.OK)
          self.setCenter(results[0].geometry.location)
          self.addMarker(self.getCenter())

    geocodeAddress:(address, callback) =>
      self = @
      geocoder = new google.maps.Geocoder()
      geocoder.geocode( { 'address': address},callback)

    addMarkerImage: (image, position) =>
      marker = @addMarker position

      icon = url: image.url

      if image.size? 		then icon.size 	 = new google.maps.Size image.size[0], image.size[1]
      if image.origin? 	then icon.origin = new google.maps.Point image.origin[0], image.origin[1]
      if image.anchor? 	then icon.anchor = new google.maps.Point image.anchor[0], image.anchor[1]

      marker.setIcon icon
      return marker

  ko.bindingHandlers.googleMap = {
    init: (element, valueAccessor, allBindingsAccessor, viewModel) ->
      values = valueAccessor()

      element.map = new GoogleMap(element)
      if values.address then element.map.centerToAdress(ko.utils.unwrapObservable(values.address))
      if values.zoom   then element.map.setZoom(ko.utils.unwrapObservable(values.zoom))

      return
    update: (element, valueAccessor, allBindingsAccessor, viewModel)->
      values = valueAccessor()
      if values.address then element.map.centerToAdress(ko.utils.unwrapObservable(values.address))
      return
  }