let motion = false;
let ios = false;
let iosMotion = false;

let video;
let vidGraphics;

let infoHtml;
let hideHtml = false;

if (typeof DeviceMotionEvent.requestPermission === 'function') {
  ios = true
  document.body.addEventListener('click', function() {
    DeviceMotionEvent.requestPermission()
      .then(function() {
        console.log('DeviceMotionEvent enabled');

        motion = true;
        ios = true;
        iosMotion = true;
      })
      .catch(function(error) {
        console.warn('DeviceMotionEvent not enabled', error);
      })
  })
} else {
  motion = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  vidGraphics = createGraphics(width, height)
  video = createCapture({
      audio: false,
      video: {
        facingMode: "environment"
      }
    },
    function() {
      // videoLoaded = true;
      // console.log('capture ready.')
    }
  );
  // video.elt.setAttribute("playsinline", "");

  infoHtml = select('.start-text');
}

function draw() {
  clear();
  orbitControl();
  if (motion) {
    vidGraphics.image(video, 0, 0, width, height);
    let boxwidth = width < height ? width * 1 / 4 : height * 1 / 4;
    // ambientLight(150);
    // pointLight(255, 255, 255, 0, 0, boxwidth * 5);

    rotateZ(radians(rotationZ));
    rotateX(radians(rotationX));
    rotateY(-radians(rotationY));
    strokeWeight(3)
    stroke(255, 150);
    noStroke();
    fill(255);

    texture(vidGraphics);
    torus(boxwidth, boxwidth / 2, 300)
  } else {

  }

  if ((ios && iosMotion && !hideHtml) || (!ios && !hideHtml)) {
    infoHtml.addClass('hidden');
    infoHtml.removeClass('start-text');
    hideHtml = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
