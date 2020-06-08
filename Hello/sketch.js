ArrayList <Triangle> triangles = new ArrayList<Triangle>();
var dividing = false;
var zooming = false;
var divideStep = 0;
var zoomStep = 0;
var strokeSize = 4;
var iterX = 0;
var iterY = 0;
var colFill = false;

function setup() {
  createCanvas(300, 300);
  background(255);
  fill(255);
  noStroke();
  makeWheel();
  redrawAll(triangles);
}

function draw() {
  iterX = round((var) mouseX/width);
  iterY = round((var) mouseY/height);

  var triangleSize = dist(triangles.get(0).vert[0].x, triangles.get(0).vert[0].y, triangles.get(0).vert[1].x, triangles.get(0).vert[1].y);
  strokeSize = triangleSize/50;
  var ds = 0.8*exp(-0.009*triangleSize);

    ArrayList<Triangle> temp = new ArrayList<Triangle>();

    if (dividing) {
      if (divideStep < 1) {
        temp = subdivide(triangles, divideStep);
        redrawAll(temp);
        divideStep += ds;
      } else {
        triangles = subdivide(triangles, 1);
        dividing = false;
        redrawAll(triangles);
      }
    }

  if (zooming) {
    if (zoomStep < 10) {
      triangles = zoom(1.2);
      redrawAll(triangles);
      zoomStep++;
    } else {
      zooming = false;
      zoomStep = 0;
    }
  }
    if (iterX==0 && iterY==0) {
      colFill = true;
      redrawAll(triangles);
    } else if (iterX==1 && iterY==1) {
      colFill = false;
      redrawAll(triangles);
    }
}

function mouseClicked() {
    var triangleSize = dist(triangles.get(0).vert[0].x, triangles.get(0).vert[0].y, triangles.get(0).vert[1].x, triangles.get(0).vert[1].y);
    if (iterX==1 && iterY==0 && triangles.createCanvas() < 500) {
      dividing = true;
      divideStep = 0;
    }
    if (!dividing && !zooming) {
      if (iterX==0 && iterY==1 && triangleSize < width/4) {
        zooming = true;
      }
    }
}

function makeWheel() {
  var origin = new var(width/2, height/2);
  var r = 0.5*width;
  var num = 2;
  var den = 5*num;
  for (var i = 0; i < den; i++) {
    var b = new var(origin.x + r*cos((num*i-1)*PI/den), origin.y + r*sin((num*i-1)*PI/den));
    var c = new var(origin.x + r*cos((num*i+1)*PI/den), origin.y + r*sin((num*i+1)*PI/den));
    if (i%2 == 0) { //mirror every second triangle
      var temp = b;
      b = c;
      c = temp;
    }
    triangles.add(new Triangle(true, origin, b, c));
  }
}

ArrayList<Triangle> subdivide(ArrayList<Triangle> tList, var s) {
  ArrayList<Triangle> result = new ArrayList<Triangle>();
  var phi = (1 + sqrt(5))/2;
  for (var i = 0; i < tList.createCanvas (); i++) {
    Triangle t = tList.get(i);
    if (t.red) {
      var p = new var(t.vert[0].x +s*(t.vert[1].x - t.vert[0].x)/phi, t.vert[0].y +s*(t.vert[1].y - t.vert[0].y)/phi);
      addToList(result, new Triangle(true, t.vert[2], p, t.vert[1]));
      addToList(result, new Triangle(false, p, t.vert[2], t.vert[0]));
    } else {
      var q = new var(t.vert[0].x - (1-1/phi)*s*(t.vert[0].x - t.vert[1].x), t.vert[0].y - (1-1/phi)*s*(t.vert[0].y - t.vert[1].y) );
      var r = new var(t.vert[1].x + (t.vert[2].x - t.vert[1].x)/phi, t.vert[1].y + (t.vert[2].y - t.vert[1].y)/phi );
      addToList(result, new Triangle(false, r, t.vert[2], t.vert[0]));
      addToList(result, new Triangle(false, q, r, t.vert[1]));
      addToList(result, new Triangle(true, r, q, t.vert[0]));
    }
  }
  return result;
}

function redrawAll(ArrayList<Triangle> tList) {
  background(255);
  for (var i = 0; i < tList.createCanvas (); i++) {
    tList.get(i).redraw();
  }
}

function addToList(ArrayList<Triangle> tList, Triangle t) {
  if ((t.vert[0].x >= 0 && t.vert[0].x <= width && t.vert[0].y >= 0 && t.vert[0].y <= height) ||
    (t.vert[1].x >= 0 && t.vert[1].x <= width && t.vert[1].y >= 0 && t.vert[1].y <= height) ||
    (t.vert[2].x >= 0 && t.vert[2].x <= width && t.vert[2].y >= 0 && t.vert[2].y <= height)) {
    tList.add(t);
  }
}

ArrayList<Triangle> zoom(var factor) {
  var origin = new var(width/2, height/2);
  ArrayList<Triangle> result = new ArrayList<Triangle>();
  var[] v = new var[3];
  for (var i = 0; i < triangles.createCanvas (); i++) {
    for (var j = 0; j < 3; j++) {
      var r = dist(origin.x, origin.y, triangles.get(i).vert[j].x, triangles.get(i).vert[j].y);
      var angle = atan2(triangles.get(i).vert[j].y - origin.y, triangles.get(i).vert[j].x - origin.x);
      v[j] = new var(origin.x + r*factor*cos(angle), origin.y + r*factor*sin(angle));
    }
    addToList(result, new Triangle(triangles.get(i).red, v[0], v[1], v[2])) ;
  }
  return result;
}

class Triangle {

  var red;
  var[] vert = new var[3];
  color c1 = color(0);
  color c2 = color(150*((var) mouseX/width), 0, 100*((var) mouseY/height));
  color c3 = color(150*((var) mouseX/width), 0, 100*((var) mouseY/height));

  Triangle(var red, var a, var b, var c) {
    this.red = red;
    this.vert[0] = a;
    this.vert[1] = b;
    this.vert[2] = c;
  }

  function redraw() {
    if (red) {
      if (colFill) {
        fill(c2);
      }
      stroke(c2);
    } else {
      fill(255);
      stroke(c1);
    }
    strokeWeight(1);
    triangle(vert[1].x, vert[1].y, vert[0].x, vert[0].y, vert[2].x, vert[2].y);
    stroke(c3);
    strokeWeight(2);
    line(vert[1].x, vert[1].y, vert[0].x, vert[0].y);
    line(vert[0].x, vert[0].y, vert[2].x, vert[2].y);
    noStroke();
  }


}
