var colors = ['#ffffff', '#000000', '#ffffff']

var gradient = chroma.scale(colors).mode('lab')

function colorForProgress(pct){
  return gradient(pct).hex()
}

function setup() {
	createCanvas(700, 600)
}

// function showVal(name, val){
//   textAlign(RIGHT)
//   textFont('Courier')
//   text(name, 0, 0)

//   textAlign(LEFT)
//   textFont('Helvetica')
//   text(val, 10, 0)
// }

function draw() {
	background('#d0c5dd')

  var now = clock(),
      timeFields = ['hours','hour','min','sec','ms','am','pm'],
      dateFields = ['year', 'season', 'month', 'moon', 'day', 'weekday'],
      progressFields = ['year', 'season', 'month', 'moon', 'week', 'day', 'halfday', 'hour', 'min', 'sec'];
      
      var color1 = colorForProgress(now.progress.year)

  push();
  let yearX = map(now.progress.year*100, 0,100, 0, 500);
  translate(yearX, 0)
  noStroke();
  fill(color1);
  ellipse(100, 100, 50, 50);
  pop();
  
  
  push();
  stroke(100);
  strokeWeight(2);
  line(100, 350, 600, 350);
  pop();
  
  push();
  let monthX = map(now.progress.month, 0,1, 0 , 475);
  translate(monthX, 0);
  noStroke();  
  fill('#a13e8a');
  rect(75, 325, 50, 50);
  pop();
  
  // push();
  // let rotation = map(now.progress.month, 0, 1, 0, 360);
  // rotate(rotation);
  // stroke(0);
  // strokeWeight(0.75);
  // line(350, 250, 350, 150);
  // pop;
  
//   push();
//   stroke(255, 0, 102);
//   strokeWeight(1);
//   fill(255, 153, 153);
//   arc(100, 400, 50, 50, 0, PI + HALF_PI, PIE)
  
}

// now.moon (0-1-0)

// now.progress.moon(0-1)