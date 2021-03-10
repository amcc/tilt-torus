let motion = false;
let ios = false;
let iosMotion = false;

let video;
let vidGraphics;

let motionHtml;
let hideMotionHtml = false;
let closeButton;
let infoHtml;
let hideInfoHtml = false;


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

  motionHtml = select('.start-text');
  infoHtml = select('#info-inner');
  closeButton = select('#close')
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
  if ((ios && iosMotion && !hideMotionHtml) || (!ios && !hideMotionHtml)) {
    motionHtml.addClass('hidden');
    motionHtml.removeClass('start-text');
    hideMotionHtml = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function hideInfo(e){
  if (hideInfoHtml) {
    infoHtml.removeClass('hidden');
    closeButton.html('X Close');
  } else {
    infoHtml.addClass('hidden');
    closeButton.html('- Open');
  } 
  hideInfoHtml = !hideInfoHtml;
}
