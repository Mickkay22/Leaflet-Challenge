// Creating map object
var myMap = L.map("map", {
    center: [39.0997222,-94.5783333],
    zoom:5
});

// Adding tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

//Define arrays to hold markers
var earthQuakeMarkers = [];

// Grab data with d3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    var numberOfEarthQuakes = data.metadata.count;
    console.log(data);
    console.log(numberOfEarthQuakes);
    
        


    for (var index = 0; index < numberOfEarthQuakes; index++) {
        var earthQuake = data.features[index];
        var date = new Date(earthQuake.properties.time).toLocaleString();
        if (earthQuake.properties.mag < 1 && earthQuake.properties.mag > 0){
            color = "lawngreen"
        }
        else if (earthQuake.properties.mag < 2 && earthQuake.properties.mag >= 1){
            color = "yellow"
        }
        else if (earthQuake.properties.mag < 3 && earthQuake.properties.mag >= 2){
            color = "coral"
        }
        else if (earthQuake.properties.mag < 4 && earthQuake.properties.mag >= 3){
            color = "orange"
        }
        else if (earthQuake.properties.mag < 5 && earthQuake.properties.mag >= 4){
            color = "darkorange"
        }
        else if (earthQuake.properties.mag > 5){
            color = "red"
        }
        L.circle([earthQuake.geometry.coordinates[1],earthQuake.geometry.coordinates[0]],{
            color: "black",
            opacity: 0.8,
            weight: 0.5,
            fillColor: color,
            fillOpacity: 0.8,
            radius: earthQuake.properties.mag*20000
        }).bindPopup("<h3>Location - " + earthQuake.properties.place + "</h3><h3>Magnitude - " + earthQuake.properties.mag + "</h3><h3>Date - " + date).addTo(myMap);
    }
});

// myMap.addLegend(
//     position = c("bottomright"),
//     bins = 6,
//     colors = ["lawngreen","yellow","coral","orange","darkorange","red"],
//     labels = ["0-1","1-2","2-3","3-4","4-5","5+"])

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = ["lawngreen","yellow","coral","orange","darkorange","red"],
    labels = ["0-1","1-2","2-3","3-4","4-5","5+"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + grades[i] + '"></i> ';
}

return div;
};

legend.addTo(map);