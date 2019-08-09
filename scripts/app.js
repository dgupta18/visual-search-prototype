// creating map
var map = L.map('map', { editable: true });

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.satellite'
}).addTo(map);

var videoUrls = [
  // 'video.mp4'
  "https://www.mapbox.com/bites/00188/patricia_nasa.webm",
  'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
];
// var videoElement = '<video controls autoplay muted loop width="150" height="100"> <source src="https://www.mapbox.com/bites/00188/patricia_nasa.mp4" type="video/mp4"> </video>';
var bounds = L.latLngBounds([[32, -130], [13, -100]]);

map.fitBounds(bounds);

// creating video layer
var overlay = L.videoOverlay(videoUrls, bounds, {
  opacity: 0.8,
  interactive: true
});

// showing controls for video
overlay.on('load', function () {
  // overlay.getElement().setAttribute("controls", "true"); // = true;
  // overlay.getElement().controls = 'true';
  overlay.getElement().setAttribute('controls','');
  overlay.getElement().setAttribute('muted','');
  overlay.getElement().setAttribute('autoplay','');
});

// adding video overlay to map
map.addLayer(overlay);

// L.EditControl = L.Control.extend({
//   options: {
//     position: 'topleft',
//     callback: null,
//     kind: '',
//     html: ''
//   },

//   onAdd: function (map) {
//     var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
//       link = L.DomUtil.create('a', '', container);
//     link.href = '#';
//     link.title = 'Create a new ' + this.options.kind;
//     link.innerHTML = this.options.html;
//     L.DomEvent.on(link, 'click', L.DomUtil.stop)
//       .on(link, 'click', function () {
//         window.LAYER = this.options.callback.call(map.editTools);
//       }, this);

//     return container;
//   }
// });


// creates button to create a new rectangle
// L.NewRectangleControl = L.EditControl.extend({
//   options: {
//     position: 'topleft',
//     callback: map.editTools.startRectangle,
//     kind: 'rectangle',
//     html: '⬛'
//   }
// });


var stateChangingButton = L.easyButton({
  states: [{
    stateName: 'pause',        // name the state
    icon:      'fa-pause',               // and define its properties
    title:     'pause video',      // like its title
    onClick: function(btn, map) {       // and its callback
      overlay.getElement().pause();
      console.log(overlay.getElement().currentTime);
      btn.state('play');    // change state on click!
    }
  }, {
    stateName: 'play',
    icon:      'fa-play',
    title:     'play video',
    onClick: function(btn, map) {
      overlay.getElement().play();
      btn.state('pause');
    }
  }]
});

stateChangingButton.addTo(map);

// overlay.on('load', function () {
//     var MyPauseControl = L.Control.extend({
//         onAdd: function() {
//             var button = L.DomUtil.create('button');
//             button.innerHTML = '⏸';
//             L.DomEvent.on(button, 'click', function () {
//                 videoOverlay.getElement().pause();
//             });
//             return button;
//         }
//     });
//     var MyPlayControl = L.Control.extend({
//         onAdd: function() {
//             var button = L.DomUtil.create('button');
//             button.innerHTML = '⏵';
//             L.DomEvent.on(button, 'click', function () {
//                 videoOverlay.getElement().play();
//             });
//             return button;
//         }
//     });

//     var pauseControl = (new MyPauseControl()).addTo(map);
//     var playControl = (new MyPlayControl()).addTo(map);
// });

var rec = L.rectangle([
  [30.3, -130],
  [14.9, -100]
]).addTo(map);
rec.enableEdit();
rec.on('dblclick', L.DomEvent.stop).on('dblclick', rec.toggleEdit);

// putting button to add rectangle onto map
// map.addControl(new L.NewRectangleControl());

