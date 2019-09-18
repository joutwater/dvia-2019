var x = 20 // starting x position to draw
var y = 20  // starting y position to draw
var barHeight = 100 // height of each bar
var maxWidth = 760 // maximum width of each bar (the actual width will always be ≤ this)
var spacing = 40 // the vertical space to skip between bars

var discrete = false // flag whether to have the bars 'tick' from one value to the next or move smoothly,
                    // try setting it to false and see what happens...

//this gets called only once in the very beginning
function setup() {
	createCanvas(800, 800)
}

//this gets called every frame (about 60 frames per second)
function draw() {
  background(230)
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
    hourWidth = 15 * now.progress.day
    minsWidth = 30 * now.progress.hour
    secsWidth = 6 * now.progress.min
  }

  //draw 3 background bars to indicate the max width


  // draw the hours bar at the top...
  fill(166, 12, 0)
  arc(250, 250, 250, 250, 270, hourWidth);

  // ...the minutes bar in the middle...
  fill(20, 204, 0)
  arc(400, 400, 150, 150, 270, minsWidth);

  // ...and the seconds bar at the bottom
  fill(166, 204, 0)
  arc(550, 550, 50, 50, 270, secsWidth);
}


// (50, 50, 80, 80, 0, PI + QUARTER_PI, PIE);

// 30, 30 + 2*(barHeight+spacing), secsWidth, 80