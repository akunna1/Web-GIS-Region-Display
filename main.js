var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var natGeoMap = L.tileLayer.provider('Esri.NatGeoWorldMap');
var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

var baseMaps = {
    OSM: osmMap,
    'ESRI NatGeo Map': natGeoMap,
    'World Imagery': imageryMap
};

var overlayMaps = {};

var map = L.map('map', {
    center: [9.227958, 8.087665],
    zoom: 6,
    layers:[osmMap]
});

var mapLayers = L.control.layers(baseMaps, overlayMaps).addTo(map);

var stateLayer;

fetch('https://geodatahub.github.io/geodatahub-nigeria/nig_states_wgs84.geojson')
    .then(response => response.json())
    .then(data => {
        stateLayer = L.geoJSON(data);
        overlayMaps["Nigeria States"] = stateLayer;
        mapLayers.addOverlay(stateLayer, "Nigeria States");
    })
    .catch(error => {
        console.error('Error fetching GeoJSON:', error);
    });
