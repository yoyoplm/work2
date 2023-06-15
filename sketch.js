let numFish = 35;
let fishes = [];
let ripples = [];
let numLotus = 10;
let lotuses = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numFish; i++) {
    let fish = {
      x: random(width),
      y: random(height),
      speedX: random(-4, 4),
      speedY: random(-4, 4),
      fishSize: 20,
      trailLength: 20,
      trail: [],
      color: generateRandomColor()
    };
    fishes.push(fish);
  }

  for (let i = 0; i < numLotus; i++) {
    let lotus = {
      x: random(width),
      y: random(height),
      size: random(50, 200)
    };
    lotuses.push(lotus);
  }
}

function draw() {
  background(50);

  for (let i = 0; i < numFish; i++) {
    let fish = fishes[i];

    fish.x += fish.speedX;
    fish.y += fish.speedY;

    if (fish.x < 0 || fish.x > width) {
      fish.speedX *= -1;
    }
    if (fish.y < 0 || fish.y > height) {
      fish.speedY *= -1;
    }

    fish.trail.push({ x: fish.x, y: fish.y });

    if (fish.trail.length > fish.trailLength) {
      fish.trail.shift();
    }

    drawFish(fish.x, fish.y, fish.fishSize, fish.trail, fish.color);
    

    if (random() < 0.01) {
      fish.speedX = random(-4, 4);
      fish.speedY = random(-4, 4);
    }
  }

  if (random() < 0.05) {
    let randomX = random(width);
    let randomY = random(height);
    createRipples(randomX, randomY);
  }

  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    ripple.radius += 2;
    ripple.alpha -= 4;

    if (ripple.alpha <= 0) {
      ripples.splice(i, 1);
      continue;
    }

    drawRipple(ripple.x, ripple.y, ripple.radius, ripple.alpha);
  }

  for (let i = 0; i < numLotus; i++) {
    let lotus = lotuses[i];
    drawLotus(lotus.x, lotus.y, lotus.size);
  }
}

function createRipples(x, y) {
  let ripple = {
    x: x,
    y: y,
    radius: 0.1,
    alpha: 150
  };
  ripples.push(ripple);
}

function drawFish(x, y, fishSize, trail, color) {
  for (let i = 0; i < trail.length - 1; i++) {
    let point = trail[i];
    let size = map(i, 0, trail.length - 1, 2, fishSize);
    let alpha = map(i, 0, trail.length - 1, 255, 0);

    fill(red(color), green(color), blue(color), alpha);
    noStroke();
    ellipse(point.x, point.y, size, size);
  }

  fill(red(color), green(color), blue(color));
  noStroke();
  ellipse(x, y, fishSize, fishSize);
}

function drawRipple(x, y, radius, alpha) {
  noFill();
  stroke(255, alpha);
  let rippleRadius = radius * 4;
  ellipse(x, y, rippleRadius, rippleRadius);
}

function drawLotus(x, y, size) {
  fill(0, 150, 0);
  noStroke();
  let leafSize = size * 1.5;
  ellipse(x, y, leafSize, leafSize);

  fill(255, 200, 0);
  noStroke();
  let petalSize = size;
  ellipse(x, y, petalSize, petalSize);
}

function mouseMoved() {
  for (let i = 0; i < numFish; i++) {
    let fish = fishes[i];
    let dx = mouseX - fish.x;
    let dy = mouseY - fish.y;
    let distance = dist(fish.x, fish.y, mouseX, mouseY);

    if (distance < 200) {
      let angle = atan2(dy, dx);
      let speed = map(distance, 0, 200, 5, 0);
      let currentSpeed = sqrt(fish.speedX * fish.speedX + fish.speedY * fish.speedY);
      fish.speedX = -cos(angle) * currentSpeed;
      fish.speedY = -sin(angle) * currentSpeed;
    }
  }
}

function generateRandomColor() {
  let r = random(255);
  let g = random(0, 255);
  let b = random(0, 0);
  return color(r, g, b);
}
