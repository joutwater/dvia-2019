
function setup() {
  createCanvas(512, 256); // set the size of the canvas
  frameRate(60) // redraw the screen 60 times per second
  background(0) // fill the canvas with black pixels

  // set parameters that will affect our drawing commands below
  ellipseMode(CENTER)
  textAlign(CENTER)
  textSize(72)
  noStroke()
}

function draw() {
  // note that we do NOT call background() again; this means that whatever was rendered to the
  // canvas the last time draw() was called will stick around rather than being covered over
  
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
    secsWidth = now.progress.min
}
  // pick random values to decide on location, size, and opacity of the next dot
  var x = secsWidth
  var y = randomGaussian(height/2, height/8)
  var r = random(3, 10)
  var c = color(255, random(100))

  // set the color & draw the dot
  fill(c)
  ellipse(x, y, r)

  // switch back to drawing in black and print our greeting on top
  fill(0)
  text("Peekaboo!", width/2, height/2 + textSize()/3)
}
