// ;(()=>{

// the data loaded from a USGS-provided CSV file
var table;

// my leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/queryA.csv", "csv", "header");
}

function setup() {
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    mymap = L.map('quake-map').setView([36.005, -119.3], 7);

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
    
        Tectonic.useMap(mymap);

    // use lodash to count up the number of earthquakes per faultline and store them in an object whose
    // attributes are fault names and values are integers with the total counts
    var faultCounts = _.countBy(table.rows, function(row){
      // Tectonic.findFault() takes a [lat,lng] coordinate and returns an object with fields for
      // 'latitude', 'longitude', 'distance', and 'name' describing which fault (and where along it)
      // the quake is closest to. The distance value is in kilometers and latitude/longitude are the 
      // the closest point to the quake on the fault.
      return Tectonic.findFault(row.getNum('latitude'), row.getNum('longitude')).name
    })

    // the variable Tectonic.plates is an array of geoJson 'feature' objects. 
    // Add each to the map as a blue line...
    for (var i=0; i<Tectonic.faults.length; i++){
        var fault = Tectonic.faults[i]
        var name = fault.properties.name

        var layer = L.geoJSON(fault.geometry)
        layer.setStyle({
            color:'red', 
            weight:3, 
            opacity:0.5, 
            fillOpacity:0
        }).addTo(mymap);
    }
    
        // step through the earthquakes csv and add a small dot for each one
    for (var z=0; z<table.rows.length; z++){
        var row = table.getRow(z)
        var lat = row.getNum('latitude')
        var lng = row.getNum('longitude')
        var mag = row.getNum('mag')

        // find the intersection point with the nearest fault
        var closest = Tectonic.findFault(lat, lng, true)

        // draw a line connecting the quake to the closest faultline nearby
        L.polyline([[lat, lng], [closest.latitude, closest.longitude]], {
            color:'orangered',
            weight:1,
        }).addTo(mymap);

        // draw a marker at the location of the quake itself
        L.circleMarker([lat, lng], {
            weight:0.5,
            color:'orange',
            fillColor:'orange',
            fillOpacity:0.5,
            radius:5,
        })
        .bindPopup(`
            <p>distance: ${closest.distance.toFixed(1)*0.62} mi</p>
            <p>latitude: ${row.get("latitude")}</p>
            <p>longitude: ${row.get("longitude")}</p>
            <p>depth: ${row.get("depth")}</p>
            <p>magnitude: ${row.get("mag")}</p>
        `).addTo(mymap);
    }

    // // step through the rows of the table and add a dot for each event
    //         var pointA = new L.LatLng(38.955773, -123.699178);
    //         var pointB = new L.LatLng(37.183339, -122.018543);
    //         var pointC = new L.LatLng(34.926754, -119.499934);
    //         var pointD = new L.LatLng(34.044143, -116.700631);
    //         var pointE = new L.LatLng(33.357667, -115.736229);
    //         var pointList = [pointA, pointB, pointC, pointD, pointE];
            
    //         var firstpolyline = new L.Polyline(pointList, {
    //         color: 'red',
    //         weight: 3,
    //         opacity: 0.5,
    //         smoothFactor: 1
    //     });
    // firstpolyline.addTo(mymap);
    
    // for (var i=0; i<table.getRowCount(); i++){
    //     var row = table.getRow(i)

    //     // skip over any rows where the magnitude data is missing
    //     if (row.get('mag')==''){
    //         continue
    //     }
    //     // create a new dot
    //     push();
    //     var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
    //         color: 'orange',      // the dot stroke color
    //         weight: 0.5,
    //         fillColor: 'orange', // the dot fill color
    //         fillOpacity: 0.35,  // use some transparency so we can see overlaps
    //         radius: row.getNum('mag') * 1500
    //     })
    //     pop();

    //     // place the new dot on the map
    //     circle.addTo(mymap);
        
    //     circle.bindPopup(`
    //         <p>latitude: ${row.get("latitude")}</p>
    //         <p>longitude: ${row.get("longitude")}</p>
    //         <p>depth: ${row.get("depth")}</p>
    //         <p>magnitude: ${row.get("mag")}</p>
    //     `);
        

    
    // }
    
    
    
diagram_setup(table);
}

// })();

// L.circle([lat,lng], radius).addTo(map);
