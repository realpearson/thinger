//Thing for Interaction
//Animated patterns for Sound Design
//


let Thingy; //Creature

let Sounds; //All sounds
let SoundsTemp; //A sentence
let buttonSound;

var sNum; //Logic for incrementing callback loop

//UI
let button1 = false;
let button2 = false;

//----------------------------------------

function preload() {
  //These are all the speech parts we have to choose from
  Sounds = [
    loadSound("Sounds/sound1.wav"),
    loadSound("Sounds/sound2.wav"),
    loadSound("Sounds/sound3.wav"),
    loadSound("Sounds/sound4.wav"),
    loadSound("Sounds/sound5.wav"),
    loadSound("Sounds/sound6.wav"),
    loadSound("Sounds/sound8.wav")

  ]
  //This will house the speech parts to be spoken
  SoundsTemp = [];

  buttonSound = loadSound("Sounds/Bloop1.wav");
}


function setup() {

  createCanvas(200, 200);
  smooth(4);

  Thingy = new RandomThing();
  Thingy.CreateThing();
  sNum = 0;
}

function draw() {
  clear();
  //background(220);
  //noFill();
  fill(255, 255, 255, 20);
  stroke(245, 140, 0);
  strokeWeight(5);
  rect(0, 0, width, height);


  Thingy.RenderThing();

  //UI, make into class/ function later
  stroke(0);
  strokeWeight(2);
  let f1 = 0;
  if (button1) f1 = 50;
  let f2 = 0;
  if (button2) f2 = 50;
  fill(245 - f2, 140, 0);
  rect(width / 2 + 15, height - 55, 75, 30);
  fill(245 - f1, 140, 0);
  rect(10, height - 55, 75, 30);
  noFill();
  strokeWeight(1);
  text("speak", width / 2 + 35, height - 35);
  text("make thing", 18, height - 35);
}

//Interaction
function keyPressed() {
  if (key == ' ') {
    //Thingy.RandomizeVars();
    //Thingy.CreateThing();
  }
}

function mousePressed() {
  //Speak();
  //Thingy.CreateThing();

  //UI Button collision
  //Speak (width/2, height-55, 75, 30)
  if (mouseX > width / 2 && mouseX < (width / 2 + 75)) {
    if (mouseY > height - 55 && mouseY < (height - 55) + 30) {
      print("Speak");
      button2 = true;
      Speak();
      setTimeout(button2reset, 200);
    }
  } else if (mouseX > 10 && mouseX < (10 + 75)) {
    if (mouseY > height - 55 && mouseY < (height - 55) + 30) {
      print("Make Thing");
      buttonSound.play();
      button1 = true;
      Thingy.RandomizeVars();
      Thingy.CreateThing();
      setTimeout(button1reset, 200);
    }
  }
}

function button1reset() {
  button1 = false;
  print("reset b1")
}

function button2reset() {
  button2 = false;
  print("reset b2");
}


//-------------Sound Logic------------------------

//Randomizes sounds to be played in speech
function RandomizeSounds() {
  var total = 3;
  var numsounds = Sounds.length;
  var _sounds = [...Sounds];
  var randomizedlist = [];

  while (total > 0) {
    var nxt = Math.trunc(random(0, _sounds.length));
    randomizedlist.push(_sounds[nxt]);
    _sounds.splice(nxt, 1);
    total--;
  }
  //The next sentence
  SoundsTemp = [...randomizedlist];
}

//Initiates speech
function Speak() {
  RandomizeSounds();
  PlaySound(0);
  SoundsTemp[0].onended(SchedSound)

  //Move Mouth
  Thingy.MoveMouth();
}

//Callback loop for triggering speech parts
function SchedSound(element) {
  sNum++;

  if (sNum < SoundsTemp.length) {
    PlaySound(sNum);
    SoundsTemp[sNum].onended(SchedSound);

    //Move Mouth
    Thingy.MoveMouth();
  } else {
    sNum = 0;
  }
}

//Play() wrapper
function PlaySound(num) {
  SoundsTemp[num].rate(random(0.9, 1.8))
  SoundsTemp[num].play();
  //Distance & other modulation
}


//-----------------------------------

class RandomThing {
  constructor() {
    this.NextThing;

    this.posOffsetX = 0;
    this.posOffsetY = 0;

    this.Size = 90;
    this.Hr = 30;

    this.flipH = false;
    this.SizeOffset = 20;
    this.CornerDefRand = 35;

    this.Q1 = 5;
    this.Q2 = 5;
    this.Q3 = 5;
    this.Q4 = 5;

    this.q1;
    this.q2;
    this.q3;
    this.q4;

    this.ranRange = 5;
    this.ran1;
    this.ran2;
    this.ran3;
    this.ran4;

    this.AntenaEndX = 0;
    this.AntenaEndX2 = 0;

    this.dimple = false;


    this.RandomizeVars();
  }

  CreateThing() {
    this.NextThing = createGraphics(200, 200);

    //this.RandomizeVars();

    this.NextThing.push();
    this.NextThing.translate(65, 40);

    //Body
    this.NextThing.fill(this.bodyFill.x, this.bodyFill.y, this.bodyFill.z);
    this.NextThing.stroke(this.bodyStroke.x, this.bodyStroke.y, this.bodyStroke.z);
    this.NextThing.rect(0, this.Hr, this.Size - 1 - this.Hr, this.Size - this.Hr, this.Q1 + this.q1, this.Q2 + this.q2, this.Q3 + this.q3, this.Q4 + this.Q4);

    //Eye
    this.NextThing.fill(this.eyeFill.x, this.eyeFill.y, this.eyeFill.z);
    this.NextThing.stroke(this.eyeStroke.x, this.eyeStroke.y, this.eyeStroke.z);
    this.NextThing.ellipse(this.Size / 2, (this.Size + this.Hr) / 3.5, (this.Size - this.Hr) / 2.4, (this.Size - this.Hr) / 5);
    this.NextThing.fill(this.innerEyeFill.x, this.innerEyeFill.y, this.innerEyeFill.z);
    this.NextThing.ellipse((this.Size) / 2, (this.Size + this.Hr) / 3.5, (this.Size - this.Hr) / 7, (this.Size - this.Hr) / 7);

    //Mouth
    this.NextThing.push();

    this.NextThing.translate(-5, 20);
    this.NextThing.quad(
      this.Size / 2, this.Size / 3.5,
      this.Size / 2 + this.mouthPt2X, this.Size / 3.5,
      this.Size / 2 + this.mouthPt3X, this.Size / 3.5 + this.mouthPt3Y,
      this.Size / 2, this.Size / 3.5 + this.mouthPt4Y
    );
    this.NextThing.line((this.Size / 2) + 10, (this.Size / 3.5) + 10, this.Size / 2 + this.mouthLine, (this.Size / 3.5) + 10);
    if (this.dimple)
      this.NextThing.ellipse((this.Size / 2) - 2, (this.Size / 3.5) + 7, 2, 2);

    this.NextThing.pop();

    //Antenae
    this.NextThing.push();

    this.NextThing.fill(this.antennaFill.x, this.antennaFill.y, this.antennaFill.z);
    this.NextThing.ellipse(this.AntenaEndX, 5, 8, 8);
    this.NextThing.ellipse(this.AntenaEndX2, 5, 8, 8);

    this.NextThing.noFill();

    this.NextThing.curve(
      this.Size / 2 + this.a1Pt1X, this.Hr * 0.90,
      this.Size / 2.5, this.Hr * 0.90,
      this.AntenaEndX, 5,
      this.Size / 2 - this.a1Pt4X, this.a1Pt4Y
    );

    this.NextThing.curve(
      this.Size / 2 + this.a2Pt1X, this.Hr * 0.90,
      this.Size / 2.5, this.Hr * 0.90,
      this.AntenaEndX2, 5,
      this.Size / 2 - this.a2Pt4X, this.a2Pt4Y
    );

    this.NextThing.pop();

    //Arms
    this.NextThing.noFill();
    this.NextThing.ellipse(15, this.Size / 3.5 + 20, 10, 10);
    this.NextThing.strokeWeight(2);
    this.NextThing.line(15, this.Size / 3.5 + 20, 25, this.Size / 3.5 + 40 + this.ran1);
    this.NextThing.line(25, this.Size / 3.5 + 40 + this.ran1, 40 + this.ran2, this.Size / 3.5 + 50);

    this.NextThing.line(40 + this.ran2, this.Size / 3.5 + 50, 39, this.Size / 3.5 + 55);
    this.NextThing.line(40 + this.ran2, this.Size / 3.5 + 50, 45, this.Size / 3.5 + 55);
    this.NextThing.line(40 + this.ran2, this.Size / 3.5 + 50, 48, this.Size / 3.5 + 50);


    this.NextThing.pop();
  }

  RandomizeVars() {
    this.SizeOffset = Math.trunc(random(-this.SizeOffset, this.SizeOffset));

    this.q1 = this.Q1 + random(-this.CornerDefRand / 2, this.CornerDefRand);
    if (this.q1 < -4.9) this.q1 = -4.9;
    this.q2 = this.Q2 + random(-this.CornerDefRand / 2, this.CornerDefRand);
    if (this.q2 < -4.9) this.q2 = -4.9;
    this.q3 = this.Q3 + random(-this.CornerDefRand / 2, this.CornerDefRand);
    if (this.q3 < -4.9) this.q3 = -4.9;
    this.q4 = this.Q4 + random(-this.CornerDefRand / 2, this.CornerDefRand);
    if (this.q4 < -4.9) this.q4 = -4.9;

    //Mouth Randomization
    this.mouthPt2X = random(10, 20);
    this.mouthPt3X = random(10, 20);
    this.mouthPt3Y = random(5, 10);
    this.mouthPt4Y = random(5, 10);

    this.mouthLine = random(0, 11);

    if (Math.trunc(random(0, 2)) == 1)
      this.dimple = true;

    //Colors
    this.bodyFill = createVector(random(0, 255), random(0, 255), random(0, 255));
    this.bodyStroke = createVector(random(0, 255), random(0, 255), random(0, 255));
    this.eyeFill = createVector(random(200, 255), random(200, 255), random(200, 255));
    this.eyeStroke = createVector(random(0, 255), random(0, 255), random(0, 255));
    this.innerEyeFill = createVector(random(0, 75), random(0, 75), random(0, 75));
    this.antennaFill = createVector(random(0, 255), random(0, 255), random(0, 255));


    this.AntenaEndX = this.Size / 2 + random(-20, 10);
    this.AntenaEndX2 = this.Size / 2 + random(-20, 10);

    this.a1Pt1X = random(-20, 20);
    this.a1Pt4X = random(-20, 20);
    this.a1Pt4Y = random(-20, 20);

    this.a2Pt1X = random(-20, 20);
    this.a2Pt4X = random(-20, 20);
    this.a2Pt4Y = random(-20, 20);

    this.ran1 = random(-this.ranRange, this.ranRange);
    this.ran2 = random(-this.ranRange, this.ranRange);
    this.ran3 = random(-this.ranRange, this.ranRange);
    this.ran4 = random(-this.ranRange, this.ranRange);

    if (Math.trunc(random(0, 2)) == 0) {
      this.flipH = true;
    } else {
      this.flipH = false;
    }
  }

  MoveMouth() {
    this.mouthPt2X = random(10, 20);
    this.mouthPt3X = random(10, 20);
    this.mouthPt3Y = random(5, 10);
    this.mouthPt4Y = random(5, 10);
    this.CreateThing();
  }


  RenderThing() {
    push();

    if (frameCount % 5 == 0) {
      this.posOffsetX = random(-2, 1);
      this.posOffsetY = random(-2, 1);
    }
    translate(this.posOffsetX, this.posOffsetY);
    if (this.flipH) {
      translate(this.NextThing.width, 0);
      scale(-1, 1);
    } else {
      scale(1, 1);
    }
    image(this.NextThing, 0, 0);
    pop();

  }

  ThingDoer() {
    //this.RandomizeVars();
  }
}