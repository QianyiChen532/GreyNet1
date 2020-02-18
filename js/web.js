//spotlight model
let spotlight1;
let spotlight2;
//images
let imgS, imgS1,imgIn;
let imgName, imgCredit;
let img2013, img2014, img2015, img2016, img2017, img2018;
let imgloading, imgtext1, imgtext11,imgtext2,imgtext21,imgtext3,imgtext31;
let imgtext4, imgtext41,imgtext5, imgtext51,imgtext6,imgtext61;
let ball1, ball12, ball2, ball21, ball3, ball31, ball4, ball41;
let ball5, ball51, ball6, ball61;
//audios
let audio1, audio2;
//cubes array
let cubes=[];
let cubes1=[];
let years=[];
//box right
let x = 100;
let y = 200;
//box left
let x1 = window.innerWidth-100;
let y1 = window.innerHeight-200;
//box lines
let z = 0;
let tz = 0;

let countA = 0;
let countB = 0;

//text
let str = "2013 2014 2015 2016 2017 2018";
let year_num=6;
let font;

let keyindex=0;
let step=0.1;
let zspd=0;
let yspd;


function preload(){
  //load model width
  spotlight1 = loadModel('asset/spotlight.obj',true);
  spotlight2 = loadModel('asset/spotlight.obj',true);

  //audio
  audio1 = new Audio('audio/after you1.mp3');
  audio2 = new Audio('audio/Fading Sun.mp3');

  //background screen;
  imgS = loadImage('asset/lighting.png');
  imgIn = loadImage('asset/instruction.png');
  imgName = loadImage('asset/name.png');
  imgCredit = loadImage('asset/credit.png');
  //years
  img2013 = loadImage('asset/2013r.png');
  img2014 = loadImage('asset/2014.png');
  img2015 = loadImage('asset/2015.png');
  img2016 = loadImage('asset/2016.png');
  img2017 = loadImage('asset/2017.png');
  img2018 = loadImage('asset/2018.png');
  //load screen
  imgloading = loadImage('asset/loading.png');
  //text
  imgtext1 = loadImage('asset/text2013-1.png');
  imgtext11 = loadImage('asset/text2013-2.png');
  imgtext2 = loadImage('asset/text2014-1.png');
  imgtext21 = loadImage('asset/text2014-2.png');
  imgtext3 = loadImage('asset/text2015-1.png');
  imgtext31 = loadImage('asset/text2015-2.png');
  imgtext4 = loadImage('asset/text2016-1.png');
  imgtext41 = loadImage('asset/text2016-2.png');
  imgtext5 = loadImage('asset/text2017-1.png');
  imgtext51 = loadImage('asset/text2017-2.png');
  imgtext6 = loadImage('asset/text2018-1.png');
  imgtext61 = loadImage('asset/text2018-2.png');
  //ball
  imgball1 = loadImage('asset/ball2013-1.png');
  imgball11 = loadImage('asset/ball2013-2.png');
  imgball2 = loadImage('asset/ball2014-1.png');
  imgball21 = loadImage('asset/ball2014-2.png');
  imgball3 = loadImage('asset/ball2015-1.png');
  imgball31 = loadImage('asset/ball2015-2.png');
  imgball4 = loadImage('asset/ball2016-1.png');
  imgball41 = loadImage('asset/ball2016-2.png');
  imgball5 = loadImage('asset/ball2017-1.png');
  imgball51 = loadImage('asset/ball2017-2.png');
  imgball6 = loadImage('asset/ball2018-1.png');
  imgball61 = loadImage('asset/ball2018-2.png');

  //font
  font = loadFont("FreeSans.ttf");
}


function setup() {
  //audio
  audio2.play();

  createCanvas(windowWidth, windowHeight, WEBGL);

  frameRate(30);

  //years
  let txtTC;
  for (let k = 0; k <year_num+1; k++) {
    if (k == 0) {
      txtTC = img2013;
      tz=-200;
    } else if (k == 1) {
      txtTC = img2014;
      tz=-1500;
    } else if(k == 2){
      txtTC = img2015;
      tz=-2900;
    }else if (k ==3) {
      txtTC = img2016;
      tz=-4400;
    }else if (k ==4) {
      txtTC = img2017;
      tz=-5900;
    }else if (k == 5) {
      txtTC = img2018;
      tz=-7400;
    }

    years.push(new YearPlane(tz,txtTC));
  }
}


function draw() {
  background(0,0,0);
  //light
  let mX;
  if (mouseX<=windowWidth*0.4) {
    mX = windowWidth*0.4;
  } else if (mouseX>=windowWidth*0.6){
    mX = windowWidth*0.6;
  } else {
    mX = mouseX;
  }
  dirX = (mX / width - 0.5)*2;

  let mY;

  if (mouseY <= windowHeight*0.8) {
    mY = windowHeight*0.8;
  }else {
    mY = mouseY;
  }
  let dirY = (mY / height - 0.5)*2 ;

  pointLight(255, 255, 255, windowWidth/2, windowHeight*2, 400);
  pointLight(255, 255, 255, windowWidth, windowHeight*2, 400);
  pointLight(255, 255, 255, 0, windowHeight*2, 400);
  directionalLight(250, 250, 250, -dirX, -dirY, -1.5);

  //background cylinder
  push();
  createCylinder();
  pop();

  //Big Screen
  push();
  Screen();
  pop();

  //label
  push();
  label();
  pop();

  //Instruction
  push();
  Instruction();
  pop();

  //Name Credit
  push();
  nameTag();
  pop();

  //Source Credit
  push();
  sourceCredit();
  pop();
  // push();
  // createSpotlight1();
  // pop();
  //
  // push();
  // createSpotlight2();
  // pop();


  createCube();

  createText();


  //control direction
  if(keyindex == -1){
    zspd=-10;

  }
  if(keyindex == 10){
    zspd=10;

  }
  if(keyindex == 0){
    zspd=0;

  }

  yspd=random(-0.4,0.4);
}


function nameTag(){
  let tZ = -500;
  translate(windowWidth*1.25, -windowHeight*0.31, tZ);
  texture(imgName);
  noStroke();
  plane(windowWidth*0.3, windowHeight*0.1);
}


function sourceCredit(){
  let tZ = -500;
  translate(windowWidth*1.25, -windowHeight*0.15, tZ);
  texture(imgCredit);
  noStroke();
  plane(windowWidth*0.35, windowHeight*0.21);
}


function createCylinder(){
  noStroke();

  fill(255);
  translate(windowWidth/2,windowHeight/4);
  rotateX(PI / 2.1);
  cylinder(windowWidth*1.58, -100000);
}

//
// function createSpotlight1(){
//   //spotlight1
//   scale(1.2);
//   noStroke();
//   fill(192,192,192);
//   //location
//   translate(-windowWidth*0.2, 0, -600);
//   rotateY(1.3);
//   rotateX(-1.6);
//
//   model(spotlight1);
// }
//
//
// function createSpotlight2(){
//   //spotlight2
//   scale(1.2);
//   noStroke();
//   fill(192,192,192);
//   //location
//   translate(windowWidth*1.0, 0, -600);
//   rotateY(5);
//   rotateX(-1.6);
//
//   model(spotlight2);
// }


function Instruction(){
  let tZ = -500;
  translate(-windowWidth*0.2, -windowHeight*0.25, tZ);
  texture(imgIn);
  noStroke();
  plane(windowWidth*0.6, windowHeight*0.25);
}


function Screen(){
  let tZ = -2200;
  let txtS, w, h, posX, posY;

  if (years[0].z>=-20 && years[0].z<1100) {
    //2013
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtS = imgtext1;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtS = imgtext11;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else{
      txtS = imgloading;
      w = windowWidth*3;
      h = windowHeight*2.5;
      posX = windowWidth/2.2;
      posY = windowHeight/8;
    }
    //2014
  } else if (years[0].z>=1100 && years[0].z<2400) {
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtS = imgtext2;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtS = imgtext21;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else{
      txtS = imgloading;
      w = windowWidth*3;
      h = windowHeight*2.5;
      posX = windowWidth/2.2;
      posY = windowHeight/8;
    }
    //2015
  }else if (years[0].z>=2400 && years[0].z<4100) {
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtS = imgtext3;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtS = imgtext31;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else{
      txtS = imgloading;
      w = windowWidth*3;
      h = windowHeight*2.5;
      posX = windowWidth/2.2;
      posY = windowHeight/8;
    }
    //2016
  }else if (years[0].z>=4100 && years[0].z<5500) {
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtS = imgtext4;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtS = imgtext41;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else{
      txtS = imgloading;
      w = windowWidth*3;
      h = windowHeight*2.5;
      posX = windowWidth/2.2;
      posY = windowHeight/8;
    }
    //2017
  }else if (years[0].z>=5500 && years[0].z<7000) {
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtS = imgtext5;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtS = imgtext51;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else{
      txtS = imgloading;
      w = windowWidth*3;
      h = windowHeight*2.5;
      posX = windowWidth/2.2;
      posY = windowHeight/8;
    }
    //2018
  }else if (years[0].z>= 7000 && years[0].z<8530) {
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtS = imgtext6;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtS = imgtext61;
      w = windowWidth*2.2;
      h = windowHeight*2.5;
      posX = windowWidth/2;
      posY = windowHeight/7;
    } else{
      txtS = imgloading;
      w = windowWidth*3;
      h = windowHeight*2.5;
      posX = windowWidth/2.2;
      posY = windowHeight/8;
    }
  } else {
    txtS = imgloading;
    w = windowWidth*3;
    h = windowHeight*2.5;
    posX = windowWidth/2.2;
    posY = windowHeight/8;
  }
  translate(posX, posY, tZ);
  rotateX(0.1);
  texture(txtS);
  noStroke();
  plane(w, h);
}


function label(){
  let posX, posY, posZ;
  let w, h;
  let txtL;
  if (years[0].z>=-20 && years[0].z<1000) {
    //2013
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtL = imgball1;
      w = windowWidth*0.22;
      h = windowHeight*0.1;
      posX = cubes[2].x-280;
      posY = cubes[2].y-50;
      posZ = cubes[2].z;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtL = imgball11;
      w = windowWidth*0.18;
      h = windowHeight*0.1;
      posX = cubes1[2].x+240;
      posY = cubes1[2].y-50;
      posZ = cubes1[2].z;
    }
  } else if (years[0].z>=1100 && years[0].z<2300) {
    //2014
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtL = imgball2;
      w = windowWidth*0.22;
      h = windowHeight*0.1;
      posX = cubes[7].x-280;
      posY = cubes[7].y-50;
      posZ = cubes[7].z;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtL = imgball21;
      w = windowWidth*0.22;
      h = windowHeight*0.1;
      posX = cubes1[7].x+250;
      posY = cubes1[7].y-50;
      posZ = cubes1[7].z;
    }
  }else if (years[0].z>=2400 && years[0].z<4000) {
    //2015
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtL = imgball3;
      w = windowWidth*0.24;
      h = windowHeight*0.1;
      posX = cubes[12].x-290;
      posY = cubes[12].y-50;
      posZ = cubes[12].z;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtL = imgball31;
      w = windowWidth*0.22;
      h = windowHeight*0.1;
      posX = cubes1[12].x+250;
      posY = cubes1[12].y-50;
      posZ = cubes1[12].z;
    }
  }else if (years[0].z>=4100 && years[0].z<5400) {
    //2016
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtL = imgball4;
      w = windowWidth*0.24;
      h = windowHeight*0.1;
      posX = cubes[17].x-280;
      posY = cubes[17].y-50;
      posZ = cubes[17].z;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtL = imgball41;
      w = windowWidth*0.14;
      h = windowHeight*0.1;
      posX = cubes1[17].x+230;
      posY = cubes1[17].y-50;
      posZ = cubes1[17].z;
    }
  }else if (years[0].z>=5500 && years[0].z<6900) {
    //2017
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtL = imgball5;
      w = windowWidth*0.15;
      h = windowHeight*0.1;
      posX = cubes[22].x-260;
      posY = cubes[22].y-50;
      posZ = cubes[22].z;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtL = imgball51;
      w = windowWidth*0.23;
      h = windowHeight*0.1;
      posX = cubes1[22].x+280;
      posY = cubes1[22].y-50;
      posZ = cubes1[22].z;
    }
  }else if (years[0].z>= 7000 && years[0].z<8400) {
    //2018
    if (mouseY > windowHeight/2 && mouseX < windowWidth/2) {
      txtL = imgball6;
      w = windowWidth*0.22;
      h = windowHeight*0.1;
      posX = cubes[27].x-280;
      posY = cubes[27].y-50;
      posZ = cubes[27].z;
    } else if (mouseY > windowHeight/2 && mouseX > windowWidth/2) {
      txtL = imgball61;
      w = windowWidth*0.15;
      h = windowHeight*0.1;
      posX = cubes1[27].x+230;
      posY = cubes1[27].y-50;
      posZ = cubes1[27].z;
    }
  }
  translate(posX, posY, posZ);
  rotateX(0.05);
  texture(txtL);
  noStroke();
  plane(w, h);
}


function createCube(){
  let txtr, txtr1;
  //position
  if (countB < 30) {
    if (countB % 5 == 0) {
      x = 250;
      y = -50;
      x1 = windowWidth-250;
      txtr = imgS;
      txtr1 = imgS;
    }
    else if (countB % 5 == 1) {
      x =150;
      y = 0;
      x1 = windowWidth-150;
      txtr = imgS;
      txtr1 = imgS;
    }
    //sphere with content
    else if (countB % 5 == 2) {
      //countB---2,7,12,17,22
      x = 200;
      y = 100;
      x1 = windowWidth-200;

      //2013
      if (countB == 2) {
        txtr = imgball1;
        txtr1 = imgball11;

        //2014
      } else if (countB == 7) {
        txtr = imgball2
        txtr1 = imgball21;

        //2015
      } else if (countB == 12) {
        txtr = imgball3;
        txtr1 = imgball31;

        //2016
      } else if (countB == 17) {
        txtr = imgball4;
        txtr1 = imgball41;

        //2017
      } else if (countB == 22) {

        txtr = imgball5;
        txtr1 = imgball51;

        //2018
      } else if (countB == 27) {
        txtr = imgball6;
        txtr1 = imgball61;
      }

    } else if (countB % 5 == 3) {
      x = 150;
      y = 50;
      x1 = windowWidth-150;
      txtr = imgS;
      txtr1 = imgS;
    } else if (countB % 5 == 4) {
      x = 0;
      y = 200;
      x1 = windowWidth;
      txtr = imgS;
      txtr1 = imgS;
    }

    cubes.push(new Cube(x,windowHeight-y,z,txtr));
    cubes1.push(new Cube(x1,windowHeight-y,z,txtr1));
    countB = countB +1;
    z = z - 300;
  }
  let lastIndex = cubes.length-1;
  for (let i=lastIndex-1;i>0;i--){
    let c = cubes[i];
    c.display();
    c.move();
    let c1 = cubes1[i];
    c1.display();
    c1.move();

  }

}

function createText(){
  // tz = tz-1000;
  let lastYear = years.length-1;
  for (let l=lastYear-1;l>=0;l--){
    let year = years[l];
    year.display();
    year.move();
  }

}



class YearPlane{
  constructor(z, txtTC){

    this.x= windowWidth/2;
    this.y=windowHeight/2+300;
    this.z=z;

    this.w = 640;
    this.h = 250;

    this.xspd=0;
    yspd=0;
    zspd=0;

    this.texture = txtTC;

  }

  display(){

    push();
    translate(this.x,this.y,this.z);
    rotateX(0.3);
    noStroke();
    texture(this.texture);
    plane(this.w/2, this.h/2);
    pop();

  }

  move(){
    this.x+=this.xspd;
    this.y+=yspd;
    this.z+=zspd;
  }

  isFinished(){
    if (this.lifespan<0){
      return true;
    }else{
      return false;
    }
  }
}



class Cube{
  constructor(x,y,z, txtr){

    this.x=x;
    this.y=y;
    this.z=z;

    this.side=random(120,180);
    this.w = this.side;
    this.h = this.side;
    this.d = this.side;

    this.xspd=0;
    yspd=0;
    zspd=0;

    this.texture = txtr;

  }

  display(){

    push();
    translate(this.x,this.y,this.z);
    rotateY(abs(this.z) * 0.002);
    rotateX(frameCount * 0.01);
    noStroke();
    fill(255,0,0,80);
    //texture(imgS);
    texture(this.texture);
    sphere(this.w/2);
    pop();

    //camera constrain
    let mX;
    if ((mouseX/4) >= 281.5) {
      mX = 281.5;
    } else if ((mouseX/4) <= 183) {
      mX = 183;
    } else {
      mX = mouseX/4;
    }
    camera(width/2, 380,850, width/2, height/2, 3, 0, 1, 0);

  }


  move(){
    this.x+=this.xspd;
    this.y+=yspd;
    this.z+=zspd;

  }

  isFinished(){
    if (this.lifespan<0){
      return true;
    }else{
      return false;
    }
  }
}


function keyPressed(){

  if (key == 'ArrowUp' ) {
    keyindex=10;
  }
  if (key == 'ArrowDown' ) {
    keyindex=-1;
  }
  if (key == ' ' ) {
    keyindex=0;
  }
}
