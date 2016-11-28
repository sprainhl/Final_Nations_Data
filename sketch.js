//setup variable for global data
var nations;
var myfont;

var inputMouse = 0;
var inputRange = 0;

//sets the array of colors
var colors = [];
var arrow;
var arrowAnimation;
var legend;



function preload(){
  legend = loadImage("assetstwo/legend.png");
  nations = loadJSON("nations.json");
  myFont = loadFont('GeosansLight.ttf');
  arrowAnimation = loadAnimation("assetstwo/arrows_00000.png", "assetstwo/arrows_00009.png");
  
}


function setup(){
  colors = [color(200,65,190),color(120,5,158),color(255,200,20),color(20,50,98),color(180,60,40),color(96,181,75)];
  createCanvas(1500,1000);
  angleMode(DEGREES);
  inputRange = width/2;
  //specify the input range at 750
  image(legend,0,0);
  arrow = createSprite(1200,650,50,50); 
  arrow.addAnimation("arrow", arrowAnimation);
}

function draw() {
  background(100);
  //color of background
  noStroke();
  
  textSize(35);
  push();
  translate(1000,25);
  rotate(0);
  text("Income vs Life Expectancy",50,50);
  pop();
  
  textSize(35);
  //size of the life expectancy text
  fill('white');
  
  push();
  translate(80,500);
  //position of the text on the y axis
  rotate(-90);
  text("Life Expectancy",0,0);
  pop();
  
  text("Income",600,850);
  
  textFont(myFont);
  inputMouse = constrain(mouseX,width/2,width) - width/2;
    //this constrains the mouse from moving on the xpos from 750 - 1500
  
  textSize(150);
  //size of the year text
  textAlign(CENTER);
  stroke('black');
  fill('white');
  text(floor(map(inputMouse,0,width/2,1800,2009)),width*0.8,height*0.8);
  //bringing in the font and text size for the year
  
  
  textSize(20);
  //size of the income text
  stroke('white');
  textAlign(CENTER);
  fill('white');
  
  textAlign(CENTER);
  //placement for image legend
  image(legend, 1100,125);
 
 
  for(var i = 0;i < 179;i++){
    var tempY = dataReturn(i,"lifeExpectancy",height-20,0,inputMouse,inputRange);
    var tempX = dataReturn(i,"income",200,800,inputMouse,inputRange);
    //fill(i*20,200 - (i*3),i*4,230);
    dataEllipse(tempX,tempY,i,"population",15,25,inputMouse,inputRange);
    //this accesess the information from the created function, and looks as follows
    //dataEllipse(xpos, ypos, country#, "property", min circle size, max circle size, and the mapping to where the mouse starts and the range);
  
  }
  
  fill('white');
  line(100,50,100,800);
  //the y axis
  line(100,800,1000,800);
  //the x axis
  
  
  
  //draw the horizontal tick marks,set i equal to the start, and the i+= to the spacing
  for (var i = 200; i < 1000; i+=50){
    
    line(i,750,i,800);
    
    //map the i value to an actual income
    
    var incomeNumber = round(map(i,150,1000,0,100));
    push();
    translate(i-5,775);
    //position of the text on the x axis
    rotate(-90);
    text(incomeNumber + " K",0,0);
    pop();
  }
  for (var y = 750; y > 0; y-=50){
    //space between tick marks
    line(100, y, 150, y);
    //draws tick marks
    
    var ageNumber = round(map(y,5,800,100,0));
    
    push();
    translate(140, y-5);
    //translates y axis
    rotate(0);
    text(ageNumber + " Years",0,0);
    //position on the y axis
    pop();
    //adjusting the year numbers
  }
    drawSprites();
}


function dataEllipse(xpos,ypos,nationNumber,property,minSize,maxSize,inputPos,inputMax){  
  
  var category = "nations[" + nationNumber + "]." + property;
  //this is to create a shortcut access using concatenating (+) to add together strings and characters
  var inputPropLength = eval(category + ".length - 1");
  //this is accessing the total number of arrays within the property
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
  //taking the value of x and mapping it to the population number
  
  var propName = "region"
  var region = eval("nations[" + nationNumber + "]." + propName);
  //assigns the region a color with the array 
  switch(region){
    case "America":
      fill(colors[0]);
    break;
    
    case "Europe & Central Asia":
      fill(colors[4]);
    break;
    
    case "Sub-Saharan Africa":
      fill(colors[1]);
    break;
    
    case "Middle East & North Africa":
      fill(colors[2]);
    break;
    
    case "East Asia & Pacific":
      fill(colors[3]);
    break;
    
    case "South Asia":
      fill(colors[5]);
    break;
    
    default:
      fill(0);
    break;
  }
  
  
  
  var visualizeProp = eval(category + "[inputProp][1]");
  
  visualizeProp = map(visualizeProp,0,140000000,minSize,maxSize);
  
  ellipse(xpos,ypos,visualizeProp,visualizeProp);
  
  fill(0);
  
  //text(eval(category + "[inputProp][1]"),xpos,ypos);
}
  
function dataReturn (nationNumber,property,minRange,maxRange,inputPos,inputMax){
  
  var category = "nations[" + nationNumber + "]." + property;
  //this is to create a shortcut access using concatenating (+) to add together strings and characters
  
  var inputPropLength = eval(category + ".length - 1");
  //this is accessing the total number of arrays within the property
  
  var inputProp = map(inputPos,0,inputMax,0,inputPropLength);
    inputProp = floor(inputProp);
    inputProp = constrain(inputProp,0,inputPropLength);
  
  //this grabs the actual value out of the json table
  var visualizeProp = eval(category + "[inputProp][1]");
  
  var propertyMax = 0;
  
  if(property == "lifeExpectancy"){
    propertyMax = 90;
    visualizeProp = map(visualizeProp,0,propertyMax,minRange,maxRange);
    //variable, 0 is the start, Max, min and max
  }
  if(property == "income"){
    propertyMax = 100000;
    
    //calculate the total visual space for the income
    var totalRange = maxRange - minRange;
    var lowerTwoThirds = minRange + (totalRange * .66);
    
    if(visualizeProp < 20000){
      //spread out the income over the frist two thirds
      visualizeProp = map(visualizeProp,0,20000,minRange,lowerTwoThirds);
    }
    if(visualizeProp > 20000){
       visualizeProp = map(visualizeProp,20000,propertyMax,lowerTwoThirds,maxRange);
    }  
  }

  
  return visualizeProp;
  
}  
  
  
  
  