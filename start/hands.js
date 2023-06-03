//Elementen aanspereken
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

//Functie om door de array mey zinnen te gaan
//Om de 5 seconden word een zin van de array weergegeven op het scherm
//Er worden ook classes aangesproken om de zinnen in en uit te laten faden
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


//Functie die de hand van de gebruiker gaat volgen en gaat detecteren of er een swipe beweging wordt gemaakt of niet
//Als eer een swipe gedetecteerd word gaat men naar de volgende pagina
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