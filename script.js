let mic = 0;


var offset = 0;
var MAX_HEIGHT = 300;

var x = 0;

var y = 0;

var z = -1000;
var radius = 200;

var speed = -20;

var delta = 0.01;

var xRotate = 0;
var yRotate = 0;
let s;
let s2;
var density = 0.2;
let devlist = {}
var MIC_SENSITIVITY = 8;
var left, right, up, down, zoomin, zoomout, dup, ddown;

var SMOOTH_AMT = 2;

function setup() {
    //size(640, 480, P3D);
    frameRate(30);
    canv = createCanvas(windowWidth, windowHeight, WEBGL);
    canv.position(0,0)
    canv.style('z-index', '-1')
    //surface.setResizable(true);
    background(0);
    colorMode(HSB);
    s = new Strand(0, 0, 0, MAX_HEIGHT / 4);
    s2 = new Strand(-5, -5, -width/2, MAX_HEIGHT );
    getAudioContext().suspend();

}



function draw() {
    background(0);
    fill(255, 40);
    movement();
    
    translate(radius * cos(offset) + x, radius / 2 * sin(offset / 2) + y, radius * sin(offset) + z);
    radius = width / 3;
    for (var i = 0; i < 2 * PI; i += density) {
        var h = map(noise(i + offset), 0, 1, 0, MAX_HEIGHT);
        strokeWeight(map(h, 0, MAX_HEIGHT, 0, 15));
        stroke(map(h + mouseX / 10 , 0, MAX_HEIGHT + width / 10, 0, 255), 255, 255, 120);
        
        //line(0, 0, 0, h, 0, 0);
        //rotateZ(-map(xRotate, 0, width, -2*PI, 2 * PI));
        
        rotateX(map(yRotate, 0, width, -2*PI, 2 * PI));
        xRotate += ((mouseX-width/2) / 10 - xRotate) / ((width / SMOOTH_AMT));
        yRotate += ((mouseY-height/2) / 10 - yRotate) / ((width / SMOOTH_AMT));
        s2.display();
        s2.sway();
        rotateY(-map(xRotate, 0, width, -2*PI, 2 * PI));
        s.display();
        s.sway();
    }
    offset += delta;
}


function keyPressed() {
    if (key == 'w') {
        up = true;
    } else if (key == 's') {
        down = true;
    } else if (key == 'a') {
        left = true;
    } else if (key == 'd') {
        right = true;
    } else if (key == 'q') {
        zoomin = true;
    } else if (key == 'e') {
        zoomout = true;
    }else if(key == 'f'){
        let fs = fullscreen();
        fullscreen(!fs);
    }else if(key == 'z'){
        dup = true;
    }else if(key == 'x'){
        ddown = true;
    }else if(key == 'm'){
        userStartAudio();
        mic = new p5.AudioIn();
        mic.start();
    }

}

function keyReleased() {
    if (key == 'w') {
        up = false;
    } else if (key == 's') {
        down = false;
    } else if (key == 'a') {
        left = false;
    } else if (key == 'd') {
        right = false;
    } else if (key == 'q') {
        zoomin = false;
    } else if (key == 'e') {
        zoomout = false;
    }else if(key == 'z'){
        dup = false;
    }else if(key == 'x'){
        ddown = false;
    }

}



function movement() {
    if (up) {
        y += speed;
    } else if (down) {
        y -= speed;
    } else if (left) {
        x += speed;
    } else if (right) {
        x -= speed;
    } else if (zoomin) {
        z += speed;
    } else if (zoomout) {
        z -= speed;
    } else if(dup){
        density-=0.01;
    } else if(ddown){
        density+=0.01;
    }

}



function mouseWheel(event) {
    var e = event.delta;
    delta -= map(e, -700, 700, -0.007, 0.007);
    return false;
}


class Strand {
    constructor(_x, _y, _z, _len) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.len = _len;
    }

    display() {
        strokeWeight(5);
        noFill();
        
        let vol = mic===0?0:mic.getLevel();
        vol*=MIC_SENSITIVITY;

        let x1 = this.x;
        let y1 = this.y;
        let z1 = this.z + mouseX / 5;
        let x2 = this.x;
        let y2 = this.y + sin(offset) * radius*vol;
        let z2 = this.z + this.len;
        let x3 =  this.x;
        let y3 =  this.y + this.len;
        let z3 = sin(offset / 2) * radius*vol;
        let x4 = cos(offset) * radius*vol+this.len;
        let y4 =  width / 5 + 200;
        let z4 = 0;
        
        bezier(x1, y1, z1,x2, y2, z2,x3,y3, z3, x4,y4, z4);
    }
    sway() {
        this.len = (mouseX + mouseY) / 2 * noise(offset / 2) * 2;
    }
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}



