var x = 40 // starting x position to draw
var y = 20  // starting y position to draw
var barHeight = 30 // height of each bar
var maxWidth = 500 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 30 // the vertical space to skip between bars
var discrete = false 

function setup() {
  // set the width & height of the sketch
  createCanvas(1000, 1000)


}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourWidth = map(now.hour, 1,12, 0,maxWidth) // from hours (1-12) to pixels (0–maxWidth)
    var minsWidth = map(now.min,  0,60, 0,maxWidth)  // from mins (0–60) to pixels (0–maxWidth)
    var secsWidth = map(now.sec,  0,60, 0,maxWidth)  // from secs (0–60) to pixels (0–maxWidth)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    hourWidth = maxWidth * now.progress.day
    minsWidth = maxWidth * now.progress.hour
    secsWidth = maxWidth * now.progress.min
  }
        
        
        

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background(200, 100, 150)


  // draw the time string to the canvas
  text(now.text.date, 30, 50)
  text(now.text.time, 30, 100)
  
  fill(100, 0, 0)
  // rect(x, y,                         maxWidth,  barHeight)
  // rect(x, y +    barHeight+spacing,  maxWidth,  barHeight)
  rect(x, y + 2*(barHeight+spacing), maxWidth,  barHeight)

  // // draw the hours bar at the top...
  // fill(20, 0, 0)
  // rect(x, y,                         hourWidth, barHeight)

  // // ...the minutes bar in the middle...
  // fill(150, 0, 0)
  // rect(x, y +    barHeight+spacing,  minsWidth, barHeight)

  // ...and the seconds bar at the bottom
  fill(255, 0, 0)
  rect(x, y + 2*(barHeight+spacing), secsWidth, barHeight)

}