const headerRows = 1,
	  dataRows = 2,
      cols = 12,
      marginHeight = 0.1,
      showVerticalCenterLines = true;

var rowHeight=300
    rowWidth=600
    colWidth=500
	rowMargin=60
    rowX=50

function setup(){
	createCanvas(1000, 1000);
    // noLoop();
  	//
    // 	rowHeight = height / (headerRows + dataRows);
    // 	colWidth = width / (cols + 1);
    // 	rowMargin = rowHeight * marginHeight;
    // 	rowX = colWidth / 2;
    // 	rowWidth = cols * colWidth;
    //
  	let data = [opData, shotData];
  	for (let i=0, r=headerRows, end=headerRows+dataRows; r<end; r++, i++){
    	let rowY = r * rowHeight + rowMargin/2,
            actualRowHeight = rowHeight - rowMargin,
            rowData = data[i];
      	createRow(rowY, actualRowHeight, rowData);
    }
}

function createRow(rowY, actualRowHeight, rowData){
  	let monthColWidth = rowWidth / (cols+1),
        monthX = [];
  	for (let i=1; i<=cols; i++){
    	monthX.push(rowX + i * monthColWidth);
    }
  	//draw cartesian axes
  	stroke("black");
  	strokeWeight(4);
  	line(rowX, rowY, rowX, rowY+actualRowHeight);
	line(rowX, rowY+actualRowHeight, rowX+rowWidth, rowY+actualRowHeight);
  	//year label
  	textSize(12); //TODO: remove hard coding
  	textAlign(LEFT, BOTTOM);
  	push();
  	translate(rowX-6, rowY+actualRowHeight); //TODO: half font size, remove hard coding
  	rotate(-HALF_PI);
  	noStroke();
  	text(rowData.year, 0, 0);
  	pop();
  	//draw month center lines
  	if (showVerticalCenterLines){
        stroke("silver");
        strokeWeight(1);
        for (let x of monthX){
            line(x, rowY, x, rowY+actualRowHeight);
        }
    }
  	//text
  	let [monthDataArray, monthDataProp] = (rowData.ops) ? [rowData.ops, "ops"] : [rowData.shots, "shot"],
        startingY = rowY+actualRowHeight-2, //TODO: text margin, remove hardcoding
        y,
        changeInY = -12, //TODO: changeInY is vertical positioning of text, remove hardcoding
        x;
  	monthDataArray.sort((a,b)=>a.month-b.month); //sort ascending by month
  	textSize(10);
  	textAlign(CENTER, BOTTOM);
  	for (let m of monthDataArray){
    	if (x !== monthX[m.month-1]){
          	//moving to a new column
          	x = monthX[m.month-1];
          	y = startingY;
        }
      	text(m[monthDataProp], x, y);
      	y += changeInY;
    }
}

const opData = {"year": 1964,
     "ops": [
          {"month": 1, "ops": "DeSoto"},
          {"month": 1, "ops": "Unnamed 2"},
          {"month": 1, "ops": "Unnamed 3"},
          {"month": 4, "ops": "Lam Son"},
          {"month": 4, "ops": "Quyet Thang"},
          {"month": 5, "ops": "Chuong Duong"},
          {"month": 5, "ops": "Leaping Lena"},
          {"month": 5, "ops": "Yankee Team"},
          {"month": 5, "ops": "Unnamed 6"},
          {"month": 5, "ops": "Dan Chi 132"},
          {"month": 5, "ops": "Chinh Nghia"},
          {"month": 5, "ops": "Quyet Thang 303"},
          {"month": 6, "ops": "Unnamed 6"},
          {"month": 6, "ops": "Quyet Thang 404"},
          {"month": 6, "ops": "33-64"},
          {"month": 7, "ops": "Unnamed 6"},
          {"month": 7, "ops": "Chinh Nghia 36"},
          {"month": 7, "ops": "Quang Ngai 16"},
          {"month": 7, "ops": "Le Loi 9"},
          {"month": 7, "ops": "Unnamed 6"},
          {"month": 8, "ops": "Unnamed 6"},
          {"month": 8, "ops": "Unnamed 6"},
          {"month": 8, "ops": "Pierce Arrow"},
          {"month": 8, "ops": "Chinh Nghia"},
          {"month": 8, "ops": "Unnamed 6"},
          {"month": 8, "ops": "Tu Cuong 124"},
          {"month": 8, "ops": "Dan Chi 54"},
          {"month": 8, "ops": "Quyet Thang 606"},
          {"month": 8, "ops": "Lien Lu 7"},
          {"month": 8, "ops": "Thang Long 18"},
          {"month": 8, "ops": "Binh Thuan 39"},
          {"month": 9, "ops": "Hop Tap"},
          {"month": 10, "ops": "Project Delta"},
          {"month": 10, "ops": "Dan Chi 80"},
          {"month": 11, "ops": "Unnamed 13"},
          {"month": 12, "ops": "Barrel Roll"},
          {"month": 12, "ops": "Dan Chi 100"}
      ]
  };
    
const shotData = {"year": 1964,
   "shots": [
      	{"month": 1, "shot": "Fore"},
        {"month": 1, "shot": "Oconto"},
        {"month": 1, "shot": "Club"},
        {"month": 2, "shot": "Solendon"},
        {"month": 2, "shot": "Bunker"},
        {"month": 2, "shot": "Bonefish"},
        {"month": 2, "shot": "Mackerel"},
        {"month": 2, "shot": "Klickitat"},
        {"month": 3, "shot": "Handicap"},
        {"month": 3, "shot": "Pike"},
        {"month": 4, "shot": "Hook"},
        {"month": 4, "shot": "Sturgeon"},
        {"month": 4, "shot": "Bogey"},
        {"month": 4, "shot": "Turf"},
        {"month": 4, "shot": "Pipefish"},
        {"month": 5, "shot": "Driver"},
        {"month": 5, "shot": "Backswing"},
        {"month": 5, "shot": "Minnow"},
        {"month": 6, "shot": "Ace"},
        {"month": 6, "shot": "Bitterling"},
        {"month": 6, "shot": "Duffer"},
        {"month": 6, "shot": "Fade"},
        {"month": 6, "shot": "Dub"},
        {"month": 7, "shot": "Bye"},
        {"month": 7, "shot": "Links"},
        {"month": 7, "shot": "Trogon"},
        {"month": 8, "shot": "Alva"},
        {"month": 8, "shot": "Canvasback"},
        {"month": 8, "shot": "Player"},
        {"month": 8, "shot": "Haddock"},
        {"month": 9, "shot": "Guanay"},
        {"month": 9, "shot": "Spoon"},
        {"month": 10, "shot": "Auk"},
        {"month": 10, "shot": "Par"},
        {"month": 10, "shot": "Barbel"},
        {"month": 10, "shot": "Turnstone"},
        {"month": 10, "shot": "Salmon"},
        {"month": 10, "shot": "Garden"},
        {"month": 10, "shot": "Forest"},
        {"month": 11, "shot": "Handcar"},
        {"month": 12, "shot": "Crepe"},
        {"month": 12, "shot": "Drill_S"},
        {"month": 12, "shot": "Drill_SS"},
        {"month": 12, "shot": "Parrot"},
        {"month": 12, "shot": "Cassowary "},
        {"month": 12, "shot": "Hoopoe"},
        {"month": 12, "shot": "Mudpack"},
        {"month": 12, "shot": "Sulky"}
    ]
  };