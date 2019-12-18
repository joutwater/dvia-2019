// ;(()=>{

// position for the plot
var plotX1, plotY1; // top left corner
var plotX2, plotY2; // bottom right corner

// minimum and maximum values for data and time
var depthMin, depthMax;
var longMin, longMax;

// table as the data set
// var p5_table = table;

// an array for the time
var long;
// an array for the magnitude
var depths;

// function preload() {
//   //my table is comma separated value "csv"
//   //and has a header specifying the columns labels
//   p5_table = loadTable("data/QUAKE1.csv", "csv", "header");
// }

function diagram_setup(p5_table) {
  console.log(p5_table)
  
  var canvas = createCanvas(1000, 300);
  
  canvas.parent('sketch-holder');
  
  background(150);
  

  // define top left and bottom right corner of our plot
  plotX1 = 5;
  plotX2 = width - plotX1;
  plotY1 = 5;
  plotY2 = height- plotY1;

  strokeWeight(5);
  stroke(255,0,0,100);
  drawDataPoints(p5_table);
}

function drawDataPoints(p5_table, highlightId){
  // console.log("hello");
  // draw a background rectangle for the plot
  fill(220);
  noStroke();
  rectMode(CORNERS);
  rect(plotX1, plotY1, plotX2, plotY2);
  
  // get the two arrays of interest: time and magnitude
  long = p5_table.getColumn("longitude");
  depths = p5_table.getColumn("depth");
  mags = p5_table.getColumn("mag");
  ids = p5_table.getColumn("id");
  // get minimum and maximum values for both
  depthMin = 0.0;
  depthMax = 25.0;
  longMin = -122.5;
  longMax = -115.0;

  // cycle through array
  for(var i=0; i<long.length; i++){
    //map the x position to the time
    var x = map(long[i],longMin, longMax, plotX1, plotX2);
    // map the y position to magnitude
    var y = map(depths[i],depthMin, depthMax, plotY2-20, plotY1);
    stroke(150);
    strokeWeight(1);
    if(highlightId === ids[i]){
      strokeWeight(2);
      stroke(255,0,0)
    } 
    line(x,y,x,5);
    stroke(255,165,0,150);
    strokeWeight(2.0*mags[i]^3.5);
    point(x,y);
  }
}

// // get the maximum value within a column
// function getColumnMax(columnName){
//   var col = p5_table.getColumn(columnName);
//   // m is the maximum value
//   // purposefully start this very low
//   var m = 0.0;
//   for(var i =0; i< col.length; i++){
//     // each value within the column
//     // that is higher than m replaces the previous value
//     if(float(col[i])>m){
//       m = float(col[i]);
//     }
//   }
//   // after going through all rows, return the max value
//   return m;
// }

// })();