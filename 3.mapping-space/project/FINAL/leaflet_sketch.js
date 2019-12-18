// ;(()=>{

// the data loaded from a USGS-provided CSV file
var table;

// my leaflet.js map
var mymap;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("data/queryB.csv", "csv", "header");
    tablePlus = loadTable("data/query6.csv", "csv", "header");
}

function setup() {
    
    var tangentLayer = L.layerGroup(tangentToFault);
    var earthquakeLoc = L.layerGroup(quakeLoc);
    var faultLayer = L.layerGroup(faultLine);
    var clusterLayer = L.layerGroup(clusterList);
    var quakeSixPlus = L.layerGroup(quake6Plus);
    var theBigOne = L.layerGroup(bigQuake);
        
    // first, create a leaflet map (look in the html's style tag to set its dimensions)
    mymap = L.map('quake-map').setView([35, -119], 7, [faultLayer, earthquakeLoc, tangentLayer, clusterLayer, quakeSixPlus, theBigOne]);
    
    // , [faultLayer, earthquakeLoc]
    
    L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'a69202f085d1415fb304e68f3b2a6751',
	maxZoom: 22
    }).addTo(mymap);
            
            var bigOne = L.circle([34.2,-116.5],{
            weight:2.0,
            color:'darkred',
            fillColor:'darkred',
            fillOpacity:0.9,
            radius:40000
            });
            
            var bigQuake = [bigOne];
            // .addTo(mymap);
            
    
      // L.circle([lat,lng], radius).addTo(mymap);
        //new function
            var cluster1 = L.circle([35.9,-117.6],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:25000
            });
            // .addTo(mymap);
            
            var cluster2 = L.circle([34.3,-118.6],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:15000
            });
            // .addTo(mymap);
            
            var cluster3 = L.circle([36.2,-120.3],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:15000
            });
            // .addTo(mymap);
            
            var cluster4 = L.circle([33.5,-116.5],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:15000
            });
            // .addTo(mymap);
            
            var cluster5 = L.circle([34.1,-116.4],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:20000
            });
            // .addTo(mymap);
            
            var cluster6 = L.circle([34.25,-116.95],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:20000
            });
            // .addTo(mymap);
            
            var cluster7 = L.circle([34.1,-117.9],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:25000
            });
            // .addTo(mymap);
            
            var cluster8 = L.circle([33.09,-115.62],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:25000
            });
            // .addTo(mymap);
            
            var cluster9 = L.circle([37.1,-121.8],{
            weight:1.5,
            color:'white',
            fillColor:'white',
            fillOpacity:0.1,
            radius:25000
            });
            // .addTo(mymap);
            
            var clusterList = [cluster1, cluster2, cluster3, cluster4, cluster5, cluster6, cluster7, cluster8, cluster9];

    Tectonic.useMap(mymap);

    var faultLine = [];
    // the variable Tectonic.plates is an array of geoJson 'feature' objects. 
    // Add each to the map as a blue line...
    for (var i=0; i<Tectonic.faults.length; i++){
        var fault = Tectonic.faults[i]
        var name = fault.properties.name

        var layerF = L.geoJSON(fault.geometry)
        layerF.setStyle({
            color:'red', 
            weight:3, 
            opacity:0.5, 
            fillOpacity:0
        });
        // .addTo(mymap);
        
        faultLine.push(layerF);

    }
    
    var quakeLoc = [];
    var tangentToFault = [];
        // step through the earthquakes csv and add a small dot for each one
    for (var z=0; z<table.rows.length; z++){
        var row = table.getRow(z)
        var lat = row.getNum('latitude')
        var lng = row.getNum('longitude')
        var mag = row.getNum('mag')

        // find the intersection point with the nearest fault
        var closest = Tectonic.findFault(lat, lng, true)

        // draw a line connecting the quake to the closest faultline nearby
        var tangentLine = L.polyline([[lat, lng], [closest.latitude, closest.longitude]], {
            color:'#FF69B4',
            weight:1,
        });
        // .addTo(mymap);

        tangentToFault.push(tangentLine);

        // draw a marker at the location of the quake itself
        var circle = L.circleMarker([lat, lng], {
            weight:0.5,
            color:'orange',
            fillColor:'orange',
            fillOpacity:0.5,
            radius:5,
        })
        .on("click",function(e){
            print(e.target.id)
            drawDataPoints(table, e.target.id)
        })
        // <p>distance: ${(closest.distance*0.62).toFixed()} mi</p>
        .bindPopup(`
            <p>latitude: ${row.get("latitude")}</p>
            <p>longitude: ${row.get("longitude")}</p>
            <p>depth: ${row.get("depth")*0.62} mi</p>
            <p>magnitude: ${row.get("mag")}</p>
        `)
        .addTo(mymap);
        
        circle.id=row.getString("id");
        quakeLoc.push(circle);
        
        }
        
        var quake6Plus = [];
    
        for (var r=0; r<tablePlus.rows.length; r++){
        var row = tablePlus.getRow(r)
        var lat = row.getNum('latitude')
        var lng = row.getNum('longitude')
        var mag = row.getNum('mag')
        
        var circle1 = L.circleMarker([lat, lng], {
            weight:0.5,
            color:'orangered',
            fillColor:'orangered',
            fillOpacity:0.8,
            radius:9,
        })
        .on("click",function(e){
            print(e.target.id)
            drawDataPoints(tablePlus, e.target.id)
        })
        // <p>distance: ${(closest.distance*0.62).toFixed()} mi</p>
        .bindPopup(`
            <p>latitude: ${row.get("latitude")}</p>
            <p>longitude: ${row.get("longitude")}</p>
            <p>depth: ${row.get("depth")*0.62} mi</p>
            <p>magnitude: ${row.get("mag")}</p>
        `);
        // .addTo(mymap);
        
        circle.id=row.getString("id");
        
        quake6Plus.push(circle1);
        
    }
        
        
        tangentLayer = L.layerGroup(tangentToFault);
        earthquakeLoc = L.layerGroup(quakeLoc);
        faultLayer = L.layerGroup(faultLine);
        clusterLayer = L.layerGroup(clusterList);
        quakeSixPlus = L.layerGroup(quake6Plus);
        theBigOne = L.layerGroup(bigQuake);
      
         var overlays = {
            "Earthquakes": earthquakeLoc,
            "Earthquakes 6+": quakeSixPlus,
            "San Andreas Fault": faultLayer,
            "Tanget Lines" : tangentLayer,
            "Clusters" : clusterLayer,
            "The Big One" : theBigOne
        };
        
        
        L.control.layers([],overlays,{collapsed:true}).addTo(mymap); 
    
diagram_setup(table, tablePlus);
}

