var x = 20 // starting x position to draw
var y = 20  // starting y position to draw
var barHeight = 100 // height of each bar
var maxWidth = 760 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 40 // the vertical space to skip between bars

var discrete = false // flag whether to have the bars 'tick' from one value to the next or move smoothly,
                    // try setting it to false and see what happens...

//this gets called only once in the very beginning
function setup() {
	createCanvas(800, 600)
}

//this gets called every frame (about 60 frames per second)
function draw() {
  background(255, 204, 255)
  noStroke()

  // measure the current time & calculate the width in pixels of each bar
  var now = clock()
  if (discrete){
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var hourWidth = map(now.hour, 1,12, 0,maxWidth) // from hours (1-12) to pixels (0–maxWidth)
    var minsWidth = map(now.min,  0,60, 0,maxWidth)  // from mins (0–60) to pixels (0–maxWidth)
    var secsWidth = map(now.sec,  0,60, 0,maxWidth)  // from secs (0–60) to pixels (0–maxWidth)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    hourWidth = 740 * now.progress.day
    minsWidth = 740 * now.progress.hour
    secsWidth = 740 * now.progress.min
  }

  //draw 3 background bars to indicate the max width
  fill(245)
  rect(x, y,                         maxWidth,  barHeight)
  rect(x, y +    barHeight+spacing,  maxWidth,  barHeight)
  rect(x, y + 2*(barHeight+spacing), maxWidth,  barHeight)

  // draw the hours bar at the top...
  fill(166, 12, 265)
  rect(30, 30,                         hourWidth, 80)

  // ...the minutes bar in the middle...
  fill(20, 204, 200)
  rect(30, 30 +    barHeight+spacing,  minsWidth, 80)

  // ...and the seconds bar at the bottom
  fill(166, 204, 265)
  rect(30, 30 + 2*(barHeight+spacing), secsWidth, 80)
}