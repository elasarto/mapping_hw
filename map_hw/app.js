// Creating map object
var map = L.map("map", {
  center: [39, -100.71],
  zoom: 5
});
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZWxhc2FydG8iLCJhIjoiY2poYjY3NTJqMHZrMjMwcXU1bHI0eWg1aSJ9.C6CMwCZPDdxgBqmCAjJ-kQ").addTo(map);
  
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  var geoJson;

  function getColor(d) {
    return d >= 9 ? '#F70505' : 
      d >= 8 ? '#F74705' :
      d >= 7 ? '#F78D05' :
      d >= 6 ? '#F7C405' :
      d >= 5 ? '#F4F705' :
      d >= 4 ? '#D3F705' :
      d >= 3 ? '#89F705' : 
      d >= 2 ? '#1FF705' :
      d >= 1 ? '#05ECF7' : 
      '#059FF7';
  }
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          magnitude = [0, 1, 2, 3, 4, 5, 6, 7, 8 ,9]
          labels = [];
  
      for (var i = 0; i < magnitude.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(magnitude[i] + 1) + '"></i> ' +
              magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(map);

  function getRadius(d) {
    return d >= 9 ? d * 4 : 
      d >= 8 ? d * 4 :
      d >= 7 ? d * 4 :
      d >= 6 ? d * 4 :
      d >= 5 ? d * 4 :
      d >= 4 ? d * 4 :
      d >= 3 ? d * 4 : 
      d >= 2 ? d * 4 :
      d >= 1 ? d * 4 : 
      d * 4;
  }

  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {

    createFeatures(data.features);

  });  
  function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer){
      layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    geoJson = L.geoJson(earthquakeData, {

      onEachFeature: onEachFeature,
      // Passing in our style object
      pointToLayer: function(feature, coordinates) {
        return L.circleMarker(coordinates, {
          color: "black",
          fillColor: getColor(feature.properties.mag),
          fillOpacity: 0.6,
          radius: getRadius(feature.properties.mag),
          weight: 1,
          opacity: 0.5
      
       
      }).addTo(map);

  }})}
  
   
