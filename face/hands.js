const videoElement = document.getElementById('video');
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

var meme = document.getElementById('meme');

//create an array for the file names
const images = [""];

let prevX = 0;
let lastSwipeTime = new Date().getTime();

//Functie om te detecteren wanneer de gebruiker swipet
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
        //Gaat naar de main pagina navigeren wanneer de gebruiker een 'left swipe' doet
        if (x < prevX - 0.02) {
          lastSwipeTime = Date.now();
          location.assign('../main/index.html')
        }
        prevX = x;
      }
    }
  }
  canvasCtx.restore();
}

//Gaat de MediaPipe Hands library aanspreken en de juiste opties instellen
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

//Verbinding tussen het handtracking-systeem (hands) en de callbackfunctie (onResults)
//De functie onResults wordt uitgevoerd telkens wanneer er handtrackingresultaten beschikbaar zijn
hands.onResults(onResults);

//Functie die elke seconde controleert of de gebruikert een swipe beweging maakt
//Als er 90 seconden geen swipe was reset de installatie door terug naar de start pagina te gaan
setInterval(function() {
  if (Date.now() - lastSwipeTime >= 90000) {
    // Navigate to a different page
    location.assign('../start/index.html');
  }
}, 1000);

//Deze code ervoor dat de camerastream wordt vastgelegd, verwerkt en doorgestuurd naar het handtracking-object (hands) voor verdere analyse.
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 720,
  height: 560
});
camera.start();

//Functie om te bepalen of de gebruiker een swipe uitvoert
function isSwiping(hand) {
  const [x, y] = getHandPosition(hand);
  if (x < 0.2 || x > 0.9) {
    return true;
  }
  return false;
}

//Functie die de gemiddelde positie van een hand berekent op basis van de landmarks (kenmerkende punten) van die hand
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