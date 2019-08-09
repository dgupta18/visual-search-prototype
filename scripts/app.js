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
var videoElement = '<video controls autoplay muted loop width="150" height="100"> <source src="https://www.mapbox.com/bites/00188/patricia_nasa.mp4" type="video/mp4"> </video>';
var bounds = L.latLngBounds([[32, -130], [13, -100]]);

map.fitBounds(bounds);

// adding video overlay to map
var overlay = L.videoOverlay(videoUrls, bounds, {
  opacity: 0.8,
  interactive: true
});
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


// var stateChangingButton = L.easyButton({
//   states: [{
//     stateName: 'zoom-to-forest',        // name the state
//     icon:      'fa-tree',               // and define its properties
//     title:     'zoom to a forest',      // like its title
//     onClick: function(btn, map) {       // and its callback
//       map.setView([46.25,-121.8],10);
//       btn.state('zoom-to-school');    // change state on click!
//     }
//   }, {
//     stateName: 'zoom-to-school',
//     icon:      'fa-university',
//     title:     'zoom to a school',
//     onClick: function(btn, map) {
//         map.setView([42.3748204,-71.1161913],16);
//         btn.state('zoom-to-forest');
//     }
//   }]
// });

// stateChangingButton.addTo( YOUR_LEAFLET_MAP );

overlay.on('load', function () {
    var MyPauseControl = L.Control.extend({
        onAdd: function() {
            var button = L.DomUtil.create('button');
            button.innerHTML = '⏸';
            L.DomEvent.on(button, 'click', function () {
                videoOverlay.getElement().pause();
            });
            return button;
        }
    });
    var MyPlayControl = L.Control.extend({
        onAdd: function() {
            var button = L.DomUtil.create('button');
            button.innerHTML = '⏵';
            L.DomEvent.on(button, 'click', function () {
                videoOverlay.getElement().play();
            });
            return button;
        }
    });

    var pauseControl = (new MyPauseControl()).addTo(map);
    var playControl = (new MyPlayControl()).addTo(map);
});

var rec = L.rectangle([
  [32, -130],
  [13, -100]
]).addTo(map);
rec.enableEdit();
rec.on('dblclick', L.DomEvent.stop).on('dblclick', rec.toggleEdit);

// putting button to add rectangle onto map
// map.addControl(new L.NewRectangleControl());

