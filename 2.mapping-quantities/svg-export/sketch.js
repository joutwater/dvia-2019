const headerRows = 0,
	    dataRows = 2,
      cols = 4,
      marginHeight = 0.3,
      showVerticalCenterLines = false;
      
    var rowHeight,
    rowWidth,
    colWidth,
  	rowMargin,
    rowX;
    
  //   var save = function () {
  //   save('my-sketch.svg')
  // }

function setup(){
  // Add a final argument of `SVG` to your createCanvas command
  createCanvas(1000, 1000, SVG)
  
  noLoop();

  background(100)
  
  // svgSave();
  
      rowHeight = height / (headerRows + dataRows);
    	colWidth = width / (cols + 1);
    	rowMargin = rowHeight * marginHeight;
    	rowX = colWidth / 2;
    	rowWidth = cols * colWidth;
    	
      let data = [shotData, opData];
  	  for (let i=0, r=headerRows, end=headerRows+dataRows; r<end; r++, i++){
    	let rowY = r * rowHeight + rowMargin/2,
            actualRowHeight = rowHeight - rowMargin,
            rowData = data[i];
      	createRow(rowY, actualRowHeight, rowData);
    }
    
      save('my-sketch.svg'); 
} 

  // After you've finished drawing, use the `save` command to pick a filename. 
  // Now, every time you reload  the page the browser will download a new SVG 
  // file with that name
  // var svgSave = function () {
  //   save('my-sketch.svg')
  // }
  
  //   svgSave();
  



function createRow(rowY, actualRowHeight, rowData){
  	let monthColWidth = rowWidth / (cols+1),
        monthX = [];
  	for (let i=1; i<=cols; i++){
    	monthX.push(rowX + i * monthColWidth);
    }
  	//draw cartesian axes
  	stroke("black");
  	strokeWeight(2);
    //line(rowX, rowY, rowX, rowY+actualRowHeight);
	  line(rowX, rowY, rowX+rowWidth, rowY);
  	//draw month center lines
  	if (showVerticalCenterLines){
        stroke("silver");
        strokeWeight(1);
        for (let x of monthX){
            line(x, rowY, x, rowY+actualRowHeight);
        }
    }
  	//data text
  	noStroke();
  	let [monthDataArray, monthDataProp] = (rowData.ops) ? [rowData.ops, "ops"] : [rowData.shots, "shot"],
        startingY = rowY+20, //TODO: text margin, remove hardcoding
        y,
        changeInY = +18, //TODO: changeInY is vertical positioning of text, remove hardcoding
        x;
  	monthDataArray.sort((a,b)=>a.month-b.month); //sort ascending by month
  	textSize(13);
  	textAlign(LEFT, BOTTOM);
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
          {"month": 2, "ops": "Lam Son"},
          {"month": 2, "ops": "Quyet Thang"},
          {"month": 2, "ops": "Chuong Duong"},
          {"month": 2, "ops": "Leaping Lena"},
          {"month": 2, "ops": "Yankee Team"},
          {"month": 2, "ops": "Unnamed 6"},
          {"month": 2, "ops": "Dan Chi 132"},
          {"month": 2, "ops": "Chinh Nghia"},
          {"month": 2, "ops": "Quyet Thang 303"},
          {"month": 2, "ops": "Unnamed 6"},
          {"month": 2, "ops": "Quyet Thang 404"},
          {"month": 2, "ops": "33-64"},
          {"month": 3, "ops": "Unnamed 6"},
          {"month": 3, "ops": "Chinh Nghia 36"},
          {"month": 3, "ops": "Quang Ngai 16"},
          {"month": 3, "ops": "Le Loi 9"},
          {"month": 3, "ops": "Unnamed 6"},
          {"month": 3, "ops": "Unnamed 6"},
          {"month": 3, "ops": "Unnamed 6"},
          {"month": 3, "ops": "Pierce Arrow"},
          {"month": 3, "ops": "Chinh Nghia"},
          {"month": 3, "ops": "Unnamed 6"},
          {"month": 3, "ops": "Tu Cuong 124"},
          {"month": 3, "ops": "Dan Chi 54"},
          {"month": 3, "ops": "Quyet Thang 606"},
          {"month": 3, "ops": "Lien Lu 7"},
          {"month": 3, "ops": "Thang Long 18"},
          {"month": 3, "ops": "Binh Thuan 39"},
          {"month": 3, "ops": "Hop Tap"},
          {"month": 4, "ops": "Project Delta"},
          {"month": 4, "ops": "Dan Chi 80"},
          {"month": 4, "ops": "Unnamed 13"},
          {"month": 4, "ops": "Barrel Roll"},
          {"month": 4, "ops": "Dan Chi 100"}
      ]
  };
    
const shotData = {"year": 1964,
  "shots": [
        {"month": 1, "shot": "Fore"},
        {"month": 1, "shot": "Oconto"},
        {"month": 1, "shot": "Club"},
        {"month": 1, "shot": "Solendon"},
        {"month": 1, "shot": "Bunker"},
        {"month": 1, "shot": "Bonefish"},
        {"month": 1, "shot": "Mackerel"},
        {"month": 1, "shot": "Klickitat"},
        {"month": 1, "shot": "Handicap"},
        {"month": 1, "shot": "Pike"},
        {"month": 2, "shot": "Hook"},
        {"month": 2, "shot": "Sturgeon"},
        {"month": 2, "shot": "Bogey"},
        {"month": 2, "shot": "Turf"},
        {"month": 2, "shot": "Pipefish"},
        {"month": 2, "shot": "Driver"},
        {"month": 2, "shot": "Backswing"},
        {"month": 2, "shot": "Minnow"},
        {"month": 2, "shot": "Ace"},
        {"month": 2, "shot": "Bitterling"},
        {"month": 2, "shot": "Duffer"},
        {"month": 2, "shot": "Fade"},
        {"month": 2, "shot": "Dub"},
        {"month": 3, "shot": "Bye"},
        {"month": 3, "shot": "Links"},
        {"month": 3, "shot": "Trogon"},
        {"month": 3, "shot": "Alva"},
        {"month": 3, "shot": "Canvasback"},
        {"month": 3, "shot": "Player"},
        {"month": 3, "shot": "Haddock"},
        {"month": 3, "shot": "Guanay"},
        {"month": 3, "shot": "Spoon"},
        {"month": 4, "shot": "Auk"},
        {"month": 4, "shot": "Par"},
        {"month": 4, "shot": "Barbel"},
        {"month": 4, "shot": "Turnstone"},
        {"month": 4, "shot": "Salmon"},
        {"month": 4, "shot": "Garden"},
        {"month": 4, "shot": "Forest"},
        {"month": 4, "shot": "Handcar"},
        {"month": 4, "shot": "Crepe"},
        {"month": 4, "shot": "Drill_S"},
        {"month": 4, "shot": "Drill_SS"},
        {"month": 4, "shot": "Parrot"},
        {"month": 4, "shot": "Cassowary "},
        {"month": 4, "shot": "Hoopoe"},
        {"month": 4, "shot": "Mudpack"},
        {"month": 4, "shot": "Sulky"}
    ]
    
  };
  
  



