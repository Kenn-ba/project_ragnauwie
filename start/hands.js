const videoElement = document.getElementById('video');
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const call = document.getElementById('call');

//Array met zinnen om mensen aan te spreken
const zinnen = [
  "Ewa wilt gij is iets cool doen?",
  "Kom is hier gij",
  "Eeh hier is iets leuk te doen! Kom kom!",
  "Yo het is hier te doen he!!!",
  "psst psst! Kom is hier gij!!!"
]
let i = 0;

setInterval(() => {
  call.classList.add('fade-out');
  setTimeout(() => {
    call.textContent = zinnen[i];
    call.classList.remove('fade-out');
    call.classList.add('fade-in');
    setTimeout(() => {
      call.classList.remove('fade-in');
    }, 500);
    i = (i + 1) % zinnen.length;
  }, 500);
}, 5000);

let prevX = 0;

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
        {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
    // Detect swipe gesture
    if (results.multiHandLandmarks.length > 0) {
      const hand = results.multiHandLandmarks[0];
      if (isSwiping(hand)) {
        const x = getHandPosition(hand)[0];
        if (x < prevX - 0.02) {
          console.log('Left swipe');
          location.assign('../intro/index.html');
        }
        prevX = x;
      }
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 720,
  height: 560
});
camera.start();

function isSwiping(hand) {
  const [x, y] = getHandPosition(hand);
  if (x < 0.2 || x > 0.9) {
    return true;
  }
  return false;
}

function getHandPosition(hand) {
  let x = 0;
  let y = 0;
  for (const landmark of hand) {
    x += landmark.x;
    y += landmark.y;
  }
  x /= hand.length;
  y /= hand.length;
  return [x, y];
}