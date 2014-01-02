(function() {
  define(['knockout', 'knockout-GoogleMap'], function(ko, _unused) {
    var viewModel;
    viewModel = {
      home: ko.observable("Bremen, Germany")
    };
    return ko.applyBindings(viewModel);
  });

}).call(this);
