var blob;
var p = 0
var blobs = [];
var zoom = 1;
var eatSound;
var somFundo;


function preload(){
  eatSound = loadSound("sounds/track1.mp3");
  somFundo = loadSound("sounds/track2.mp3");
}


function setup() {
  p = 0
  
  somFundo.play();
  createCanvas(900, 800);
  blob = new Blob(0, 0, 25);
  for (var i = 0; i < 500; i++) {
    var x = random(-width,width);
    var y = random(-height,height);
    blobs[i] = new Blob(x, y, 15);
  }
}

function draw() {
  background(255);
  
  translate(width/2, height/2);
  var newzoom = 60 / blob.r;
  zoom = lerp(zoom, newzoom,0.3);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  
  for (var i = blobs.length-1; i >=0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
     
      eatSound.play();
      
      
       p++
      print(p)
      if(p >= 500){
        somFundo.play();
        setup()
      }
    }
  }

  
  
  blob.show();
  
  blob.update();
  
  
}


function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0,0);

  this.update = function() {
    
    var newvel = createVector(mouseX-width/2, mouseY-height/2);
    newvel.setMag(4);
    this.vel.lerp(newvel, 0.1);
    this.pos.add(this.vel);
     
      
  }

  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      return true;
    } else {
      return false;
    }
  }
  var c1 = random(0,255)
  var c2 = random(0,255)
  var c3 = random(0,255)
  
   
  this.show = function() {
   
    fill(c1,c2,c3);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    
  }
  
  
    
  
}
