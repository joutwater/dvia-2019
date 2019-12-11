// the data loaded from a USGS-provided CSV file
var table;

// my leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/QUAKE1.csv", "csv", "header");
}

function setup() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    mymap = L.map('quake-map').setView([36.005, -118.09], 6);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    
    // L.tileLayer.provider('Thunderforest.Landscape', {apikey: '<a69202f085d1415fb304e68f3b2a6751>'}).addTo(map);
    
    L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'a69202f085d1415fb304e68f3b2a6751',
	maxZoom: 22
    }).addTo(mymap);
    
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    // }).addTo(mymap);
    
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    // step through the rows of the table and add a dot for each event
            var pointA = new L.LatLng(38.955773, -123.699178);
            var pointB = new L.LatLng(37.183339, -122.018543);
            var pointC = new L.LatLng(34.926754, -119.499934);
            var pointD = new L.LatLng(34.044143, -116.700631);
            var pointE = new L.LatLng(33.357667, -115.736229);
            var pointList = [pointA, pointB, pointC, pointD, pointE];

            var firstpolyline = new L.Polyline(pointList, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        });
    firstpolyline.addTo(mymap);
    
    for (var i=0; i<table.getRowCount(); i++){
        var row = table.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }
        // create a new dot
        var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'orange',      // the dot stroke color
            strokeWeight: 4,
            fillColor: 'orange', // the dot fill color
            fillOpacity: 0.35,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 1000
        })

        // place the new dot on the map
        circle.addTo(mymap);
        
        circle.bindPopup(`
            <p>latitude: ${row.get("latitude")}</p>
            <p>longitude: ${row.get("longitude")}</p>
            <p>depth: ${row.get("depth")}</p>
            <p>magnitude: ${row.get("mag")}</p>
        `);
        

    
    }
    

}