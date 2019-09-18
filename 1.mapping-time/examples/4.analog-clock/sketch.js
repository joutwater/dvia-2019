/* Adapted from https://processing.org/examples/clock.html */

var cx, cy; // center position of canvas

// Radius for hands of the clock
var secondsRadius
var minutesRadius
var hoursRadius
var clockDiameter
var dotRadius
var tickRadius

var discrete = true

function setup() {
  createCanvas(1080, 500)
  stroke(120)

  var radius = min(width, height) / 2; // this is the maximum possible radius
  secondsRadius = radius * 0.725
  minutesRadius = radius * 0.60
  hoursRadius = radius * 0.50
  tickRadius = radius * .7
  dotRadius = radius * .75
  clockDiameter = radius * 1.666

  cx = width / 2
  cy = height / 2
}

function draw() {
  background(0)

  // Draw the clock background
  fill(200)
  noStroke()
  ellipse(cx, cy, clockDiameter, clockDiameter)

  // draw 60 dots around the edge corresponding to min/sec angles
  strokeWeight(2)
  stroke('black')
  beginShape(POINTS)
  for (var a = 0; a < 360; a+=6) {
    var angle = radians(a)
    var x = cx + cos(angle) * dotRadius
    var y = cy + sin(angle) * dotRadius
    vertex(x, y)
  }
  endShape()

  // draw 12 lines at the edge to mark the hours
  stroke(200)
  for (var a = 0; a < 360; a+=30) {
    let angle = radians(a),
        x0 = cx,
        x1 = cx,
        y0 = cy,
        y1 = cy
    line(x0, y0, x1, y1)
  }


  // Angles for sin() and cos() start at 3 o'clock
  // subtract HALF_PI to make them start at the top
  var now = clock()
  var s = (now.progress.sec * TWO_PI) - HALF_PI
  var m = (now.progress.min * TWO_PI) - HALF_PI
  var h = (now.progress.hour * TWO_PI) - HALF_PI

  if (discrete){
    // L[inearly] [int]ERP[olate] from the current fraction of a minute to a
    // proportional value in the range 0–2π (for a 'ticking' effect)
    s = lerp(0, TWO_PI, now.sec/60) - HALF_PI
  }

  // Draw the second hand (thin & orange)
  stroke('red')
  strokeWeight(4)
  line(cx, cy, cx + cos(s)*secondsRadius, cy + sin(s)*secondsRadius)

  // draw the minute hand (white and slightly thicker)
  stroke('blue')
  strokeWeight(20)
  line(cx, cy, cx + cos(m)*minutesRadius, cy + sin(m)*minutesRadius)

  // draw the hour hand (thicker still)
  stroke('yellow')
  strokeWeight(1)
  line(cx, cy, cx + cos(h)*hoursRadius, cy + sin(h)*hoursRadius)

}