var colors = ['#bbd8ea', '#0094b2', '#b0e3bb', '#76b17a', '#ffffb4', '#fafd64', '#f0d686', '#a89246', '#bbd8ea']

// ['darkred','orange','darkblue','steelblue','darkslategrey']

// ['lightblue','blue','lightblue','lightgreen','green', 'lightgreen', 'lightyellow', 'yellow', 'lightyellow', 'lightbrown', 'brown', 'lightbrown']

// the colorForProgress() function takes a 'progress' value between 0.0 and 1.0 and returns a hex string
// that can be passed to p5 functions like background(), fill(), stroke(), etc.
// see the chroma.js docs for details: https://vis4.net/chromajs
var gradient = chroma.scale(colors).mode('lab')

function colorForProgress(pct){
  return gradient(pct).hex()
}


function setup() {
	createCanvas(800, 600) 
}

function draw() {

  var now = clock(),
  
      timeFields = ['hours','hour','min','sec','ms','am','pm'],
      dateFields = ['year', 'season', 'month', 'moon', 'day', 'weekday'],
      progressFields = ['year', 'season', 'month', 'moon', 'week', 'day', 'halfday', 'hour', 'min', 'sec'];
      
       var color1 = colorForProgress(now.progress.year)
       background(color1)
       
  push();
  let monthChange = map(now.month, 1,12, 0,500)
  translate(0, monthChange)
  noStroke();
  fill(0)
  ellipse(400, 50, 100, 100)
  pop();
}

        
  


// CHANGE TO now.progress.year and do below!!!!
// color clock example to map the color . remeber when winter starts is not the end of the year but just before. 
// from that starting/ending point, calculate how the color will change