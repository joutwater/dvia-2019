var nuke

function preload(){
  nuke = loadJSON('data/BOMB_TEST1.json')
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  const numberOfYears = json.length;
        widthOfYearColumn = width / (numberOfYears+1);
        widthOfMonthColumn = width / json.month.length
        numberOfShots = json.shots.length;
        maxHeightOfYearColumn = json.months.length;
        fontSize = 16;

}

function draw(){
  
  push();
  
  
}