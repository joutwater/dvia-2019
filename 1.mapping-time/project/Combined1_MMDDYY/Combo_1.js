var colors = ['#bbd8ea', '#0094b2', '#b0e3bb', '#76b17a', '#ffffb4', '#fafd64', '#f0d686', '#a89246', '#bbd8ea']

// the colorForProgress() function takes a 'progress' value between 0.0 and 1.0 and returns a hex string
// that can be passed to p5 functions like background(), fill(), stroke(), etc.
// see the chroma.js docs for details: https://vis4.net/chromajs

var gradient = chroma.scale(colors).mode('lab')
function colorForProgress(pct){
  return gradient(pct).hex()
}

var x = 20 // starting x position to draw
var y = 20  // starting y position to draw
var barHeight = 100 // height of each bar
var maxWidth = 720 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 40 // the vertical space to skip between bars

var discrete = false // flag whether to have the bars 'tick' from one value to the next or move smoothly,
                    // try setting it to false and see what happens...

//this gets called only once in the very beginning
function setup() {
	createCanvas(800, 600)
}

//this gets called every frame (about 60 frames per second)
function draw() {


  // measure the current time & calculate the width in pixels of each bar
  var now = clock()
  
      timeFields = ['hours','hour','min','sec','ms','am','pm'],
      dateFields = ['year', 'season', 'month', 'moon', 'day', 'weekday'],
      progressFields = ['year', 'season', 'month', 'moon', 'week', 'day', 'halfday', 'hour', 'min', 'sec'];
  
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var moonWidth = map(now.moon, 0,1, 0, maxWidth)
    // var hourWidth = map(now.hour, 1,12, 0,maxWidth) // from hours (1-12) to pixels (0–maxWidth)
    // var minsWidth = map(now.min,  0,60, 0,maxWidth)  // from mins (0–60) to pixels (0–maxWidth)
    // var secsWidth = map(now.sec,  0,60, 0,maxwidth)  // from secs (0–60) to pixels (0–maxWidth)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    // hourWidth = 600 * now.progress.day
    // minsWidth = 600 * now.progress.hour
    // secsWidth = 720 * now.progress.min
    moonWidth = now.progress.moon
  }
  
  var color1 = colorForProgress(now.progress.year)
       background(color1)
  
  push();
  rectMode(CENTER)
  noStroke();
  fill(215)
  rect(400, 300, 200, 200)
  pop();
  
  push();
  let hourWidth = map(now.hour, 1,12, 0,190)
  translate(0, -hourWidth)
  noStroke();
  fill(0)
  rect(490, 390, 10 , 10)
  pop();
 
  push();
  let minsWidth = map(now.min,  0,60, 0,187.5)
  rectMode(CENTER);
  translate(0, -minsWidth)
  noStroke();
  fill(160)
  rect(400, 392.5, 15 , 15)
  pop();
  

  // ...and the seconds bar at the bottom
  push();
  let secsWidth = map(now.sec,  0,60, 0,170);
  translate(0, -secsWidth);
  noStroke();
  fill(255);
  rect(300, 370, 10 , 30);
  pop();
  
     
  push();
  
  let cx, cy;
  
  if (now.progress.moon < 0.125){
    cy=150;
    cx=map(now.progress.moon, 0, 0.125, 400, 550);
  }
  
  else if (now.progress.moon < 0.375){
    cy=map(now.progress.moon, 0.125, 0.375, 150, 450);
    cx=550;
  }
  
  else if (now.progress.moon < 0.625){
    cy=450;
    cx=map(now.progress.moon, 0.375, 0.625, 550, 250);
  }
  
  else if (now.progress.moon < 0.875){
    cy=map(now.progress.moon, 0.625, 0.875, 450, 150);
    cx=250;
  }
  
  else {
    cy=150;
    cx=map(now.progress.moon, 0.875, 1.0, 250, 400);
  }
  
  translate(cx, cy);
  
  let rotation = map(now.progress.moon, 0, 1, -PI*0.5, PI*1.5);
  rotate(rotation);
  let startAngle, endAngle;
  if(now.progress.moon < 0.5){
    startAngle=0;
    endAngle=map(now.progress.moon, 0, 0.5, 0, TWO_PI);
  }
  else{
    startAngle=map(now.progress.moon, 0.5, 1, -TWO_PI, 0);
    endAngle=TWO_PI;
  }
  noStroke();  
  fill(255);
  arc(0, 0, 50, 50, startAngle, endAngle);
  pop();

}
// + 2*(barHeight+spacing)