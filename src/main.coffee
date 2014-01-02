define ['knockout','knockout-GoogleMap'],(ko, _unused)->
  viewModel = {
    home: ko.observable("Bremen, Germany")
  }
  ko.applyBindings(viewModel);#ApplyBindings