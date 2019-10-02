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
	background(200)

  var now = clock(),
      timeFields = ['hours','hour','min','sec','ms','am','pm'],
      dateFields = ['year', 'season', 'month', 'moon', 'day', 'weekday'],
      progressFields = ['year', 'season', 'month', 'moon', 'week', 'day', 'halfday', 'hour', 'min', 'sec'];

  
  push();
  stroke(51, 102, 255);
  strokeWeight(4);
  fill(153, 204, 255);
  ellipse(350, 200, 100, 100);
  pop();
  
  
  push();
  stroke(255, 204, 102);
  strokeWeight(2);
  line(100, 350, 600, 350);
  pop();
  
  push();
  let moonX = map(now.progress.moon, 0,1, 0 , 500);
  translate(moonX, 0);

  let startAngle, endAngle;
  if(now.progress.moon < 0.5){
    startAngle=0;
    endAngle=map(now.progress.moon, 0, 0.5, 0, TWO_PI);
  }
  else{
    startAngle=map(now.progress.moon, 0.5, 1, -TWO_PI, 0);
    endAngle=TWO_PI;
  }
  stroke(255,0,102)
  strokeWeight(1);  
  fill(255,153,153);
  arc(100, 400, 50, 50, startAngle, endAngle);
  pop();
  
  push();
  translate(350, 200);
  let rotation = map(now.progress.month, 0, 1, 0, TWO_PI);
  rotate(rotation);
  // rectMode(CENTER);
  stroke(0);
  strokeWeight(0.75);
  line(0, 0, 30, 30);
  pop;
  
//   push();
//   stroke(255, 0, 102);
//   strokeWeight(1);
//   fill(255, 153, 153);
//   arc(100, 400, 50, 50, 0, PI + HALF_PI, PIE)
  
}

// now.moon (0-1-0)

// now.progress.moon(0-1)