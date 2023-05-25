const videoElement = document.getElementById('video');
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let explain = document.getElementById('uitleg');
let verder = document.getElementById('verder');


let count = 0;
let prevX = 0;
let lastSwipeTime = new Date().getTime();

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
        if (x < prevX - 0.065) {
          lastSwipeTime = Date.now();
          console.log('Left swipe');
          count++;
          if (count == 1) {
            explain.textContent = "We scannen eerst je gezicht om naar je huidig gevoel te kijken. Vervolgens krijg je een hoop beelden te zien.";
          }if (count == 2) {
            explain.textContent = "Om door de beelden heen te gaan ga je een swipe beweging naar rechts moeten maken om altijd het volgende beeld te zien. Zorg ervoor dat je op de juiste plaats staat en je een duidelijke swipe beweging maakt zodat de camera je zeker kan detecteren.";
          }if (count == 3) {
            explain.textContent = "Elke keer je een nieuw beeld ziet neem dan even je tijd om echt naar het beeld te kijken, we willen natuurlijk niet dat je gewoon mindless zit te swipen. Dit doe je al genoeg op je gsm!";
          }if (count == 4) {
            explain.textContent = "Hopelijk vind je het een leuke ervaring";
            verder.textContent = "Swipe om je gevoelends te scannen";
          }if (count == 5) {
            location.assign('../face/index.html');
          }
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
hands.onResults(onResults);
  setInterval(function() {
    if (Date.now() - lastSwipeTime >= 90000) {
      // Navigate to a different page
      location.assign('../start/index.html');
    }
  }, 1000);

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