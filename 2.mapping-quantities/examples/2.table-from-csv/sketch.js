var totals
var atmospheric
var underground
var nuke

function preload(){
  totals = loadTable('data/totals.csv', 'csv', 'header')
  atmospheric = loadTable('data/atmospheric.csv', 'csv', 'header')
  underground = loadTable('data/underground.csv', 'csv', 'header')
  nuke = loadTable('data/CODENAMES_NUKE.csv', 'csv', 'header')
}

function setup(){
  createCanvas(3200, 4000);
  background(0);

  // pick one of the three data files to work with and call it 'table'
  var table = nuke

  // log the whole dataset to the console so we can poke around in it
  print(table)

  // set up typography
  textFont("Rokkit")
  textSize(16)
  fill(200)
  noStroke()

  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 40

  // draw country name labels on the left edge of the table
  textStyle(BOLD)
  textAlign(RIGHT)
  for (var c=1; c<table.getColumnCount(); c++){
    text(table.columns[c], x-colWidth, y)
    y += rowHeight
  }


  // draw year labels in the header row
  x = 200
  y = 100
  textStyle(NORMAL)
  textAlign(BOLD)
  for (var r=0; r<table.getRowCount(); r++){
    var year = table.getString(r, 0)
    text(year, x, y-rowHeight)
    x += colWidth
  }

  // print out the total for each country, one column at a time
  x = 200
  for (var r=0; r<table.getRowCount(); r++){
    y = 100
    for (var c=1; c<table.getColumnCount(); c++){
      var value = table.getNum(r, c)
      text(value, x, y)
      // var series = table.columns[c];
      // var clr = palette.colorForValue(series);
      // fill(clr);
      // ellipse(x,y,value);
      y += rowHeight
    }
    x += colWidth
  }

}