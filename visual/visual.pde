float offset = 0;
float MAX_HEIGHT = 300;

float x = width/2;

float y = height/2;

float z = -width;
float radius = width/4;

float speed = -20;

float delta = 0.01;

float xRotate = 0;
float yRotate = 0;
Strand s;

boolean left, right, up, down, in , out;
void setup(){
  //size(640, 480, P3D);
  fullScreen(P3D);
  surface.setResizable(true);
  background(0) ;
  colorMode(HSB);
    s = new Strand(0,0,0,0, MAX_HEIGHT/4);
 
  
}


void draw(){
  background(0);
  fill(255, 40);
  movement();
  translate(radius*cos(offset)+x, radius/2*sin(offset/2)+y, radius*sin(offset)+z);
  radius = width/3;
  for(float i = 0; i<2*PI; i+=0.05){ 
    float h = map(noise(i+offset), 0, 1, 0, MAX_HEIGHT);
    strokeWeight(map(h, 0, MAX_HEIGHT, 0, 15));
    stroke(map(h+mouseX/10, 0, MAX_HEIGHT+width/10, 0, 255), 255 ,255, 120 );
    
    
    
    
    
    line(0,0, 0, h, 0, 0);
    //rotateY(i);
    
    
    
    //rotateZ(-map(mouseX, 0, width,0, 2*PI));
    //rotateX(map(mouseY, 0, width,0, 2*PI));
   rotateZ(-map(xRotate, 0, width,0, 2*PI));
    rotateX(map(yRotate, 0, width,0, 2*PI));
   
   xRotate+=(mouseX/5-xRotate)/((width/50)*h);
   
   yRotate+=(mouseY/5-yRotate)/((width/50)*h);
   s.display(); 
     s.sway();
   
  }
     
     
  
  offset+=delta;
}


void keyPressed(){
 if(key == 'w'){
  up = true;
 }else if(key == 's'){
  down = true;
 }else if(key == 'a'){
  left = true;
 }else if(key == 'd'){
  right = true;
 }else if(key == 'q'){
  in = true;
}else if(key == 'e'){
  out = true;
}

}

void keyReleased(){
  if(key == 'w'){
  up = false;
 }else if(key == 's'){
  down = false;
 }else if(key == 'a'){
  left = false;
 }else if(key == 'd'){
  right = false;
 }else if(key == 'q'){
  in = false;
}else if(key == 'e'){
  out = false;
}

}



void movement(){
  if(up){
  y+=speed;
 }else if(down){
  y-=speed;
 }else if(left){
  x+=speed;
 }else if(right){
  x-=speed;
 }else if(in){
  z+=speed; 
}else if(out){
  z-=speed;
}
  
}



void mouseWheel(MouseEvent event) {
  float e = event.getCount();
  println(e);
  delta+=map(e, -10,10,-0.007, 0.007);
  //delta = constrain(delta, -0.2, 0.2);
}


class Strand {
// x position of the strand
int x = 0;
// y position of the strand
int y = 0;

// z position of the strand
int z = 0;
// length of the strand
float len = 50.0;

float angle = 0;

//constructor of the class
Strand(int _x, int _y, int _z, float angle, float _len) {
  x = _x;
  y = _y;
  z = _z;
  this.angle = angle;
  len = _len;
}

// display the strand
void display() {
  noFill();
  //stroke the strand
  bezier(x, y, z+mouseX/5, x, y+sin(offset)*radius, z+len, x, y+len, sin(offset/2)*radius, cos(offset)*radius, width/5+200, z);
  
}

// add some random movement
void sway() {
  len = (mouseX+mouseY)/3*noise(offset/5)*2;
}

}
