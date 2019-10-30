function setup() {

  //Nuke test totals 1964 to 1975 (vietnam era)
  var data = [48,	39,	49,	42,	72,	61,	60,	28,	32,	27,	25,	23];
  var width = 350, // canvas width and height
      height = 350,
      margin = 20,
      w = width - 2 * margin, // chart area width and height
      h = height - 2 * margin;
  
  var barWidth =  (w / data.length) * 0.2; // width of bar
  var barMargin = (w / data.length) * 0.8; // margin between two bars
  
  createCanvas(width, height);
  
  textSize(14);
  
  push();
  translate(margin, margin); // ignore margin area
  
  for(var i=0; i<data.length; i++) {
    push();
    fill('steelblue');
    noStroke();
    translate(0, i* (barWidth + barMargin)); // jump to the top right corner of the bar
    rect(50, 0,data[i],barWidth); // draw rect

    fill('#FFF');
    text(data[i], 5, barWidth/2 + 5); // write data

    pop();
  }
  
  pop();
}

