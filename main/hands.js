const videoElement = document.getElementById('video');
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const memeContainer = document.getElementById('memeContainer');
var swipeDetectie = document.getElementById('swipeDetection');


//localStorage waardes pullen en aan een var toewijzen
var swipeCount = localStorage.getItem("memeCount");
let prevFile = null;
console.log(swipeCount)
let lastSwipeTime = new Date().getTime();

//Arrays voor de verschillende memes per categorie
//dadjokes
const mediaFiles = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.jpg",
  "35.jpg",
  "36.jpg",
  "37.jpg",
  "38.jpg"
]

//absurde humor
const mediaFiles2 = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.jpg",
  "35.jpg",
  "36.jpg",
  "37.jpg",
  "38.jpg",
  "39.jpg",
  "40.jpg",
  "41.jpg",
  "42.jpg",
  "43.jpg",
  "44.jpg"
]

//slapstick
const mediaFiles3 = [
  "01.mp4",
  "02.mp4",
  "03.mp4",
  "04.mp4",
  "05.mp4",
  "06.mp4",
  "07.mp4",
  "08.mp4",
  "09.mp4",
  "10.mp4",
  "11.mp4"
]

//lichte dark humor
const mediaFiles4 = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.jpg",
  "35.jpg",
  "36.jpg",
  "37.jpg",
  "38.jpg",
  "39.jpg",
  "40.jpg",
  "41.jpg",
  "42.jpg",
  "43.jpg",
  "44.jpg",
  "45.jpg",
  "46.jpg",
  "47.jpg",
  "48.jpg",
  "49.jpg",
  "50.jpg",
  "51.jpg",
  "52.jpg",
  "53.jpg",
  "54.jpg",
  "55.jpg",
  "56.mp4",
  "57.mp4",
  "58.mp4",
  "59.mp4",
  "60.mp4",
  "61.mp4",
  "62.mp4",
  "63.jpg",
  "64.mp4",
  "65.mp4",
  "66.mp4",
  "67.mp4",
  "68.mp4",
  "69.mp4",
  "70.mp4",
  "70.mp4"
]

//DARK dark humor
const mediaFiles5 = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg"
]


//functie om na de face scans al een beeld klaar te hebben staan voor er begonnen is met swipen
function checkReadyMeme() {
  if (swipeCount == 0) {
    memeContainer.innerHTML = '<img id="meme" src="images/01.jpg" alt="" >';
  } else if (swipeCount == 5) {
    memeContainer.innerHTML = '<img id="meme" src="images/03.jpg" alt="" >';
  } else if (swipeCount == 16) {
    memeContainer.innerHTML = '<img id="meme" src="images/05.jpg" alt="" >';
  }
}

checkReadyMeme();
let prevX = 0;
//Arrays die gaan bijhouden welke memes er al getoond zijn zodat ze geen twee keer getoond kunnen worden
let shownMemes1 = [];
let shownMemes2 = [];
let shownMemes3 = [];
let shownMemes4 = [];
let shownMemes5 = [];

//Functie om de memes te laten zien wanneer de Gebruiker een 'Left Swipe' doet
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
    // Swipe detecteren
    if (results.multiHandLandmarks.length > 0) {
      const hand = results.multiHandLandmarks[0];
      if (isSwiping(hand)) {
        const x = getHandPosition(hand)[0];
        if (x < prevX - 0.03) {
          lastSwipeTime = Date.now();
          console.log('Left swipe: ' + swipeCount);
          swipeCount++;
          //If statements die gaan kijken naar de waarde van swipeCount
          //Afhangende van de waarde gaan er memes uit de juiste vategorie getoond worden
          //Bij enkele specifieke waardes word de gebruiker doorgestuur naar een tussentijdse gezichts scan
          if (swipeCount < 5) {
            localStorage.setItem("memeCount", swipeCount);
            const folder = "./memes/dadJokes/";
            const availableFiles = mediaFiles.filter(file => !shownMemes1.includes(file));
            let randomFile;
            if (availableFiles.length === 0) {
              shownMemes1 = [];
              randomFile = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
            } else {
              randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
            }
            shownMemes1.push(randomFile);
            if (randomFile.endsWith('.jpg')) {
              memeContainer.innerHTML = `<img id="meme" src="${folder}${randomFile}" alt="Random Image">`;
            } else if (randomFile.endsWith('.mp4')) {
              memeContainer.innerHTML = `<video id="meme" src="${folder}${randomFile}" autoplay   loop></video>`;
            }
          } if (swipeCount == 5) {
            localStorage.setItem("memeCount", swipeCount);
            location.assign('./betweenPages/index.html');
          }
          if (swipeCount > 5 && swipeCount < 11) {
            localStorage.setItem("memeCount", swipeCount);
            const folder = "./memes/absurdeHumor/";
            const availableFiles = mediaFiles2.filter(file => !shownMemes2.includes(file));
            let randomFile;
            if (availableFiles.length === 0) {
              shownMemes2 = [];
              randomFile = mediaFiles2[Math.floor(Math.random() * mediaFiles2.length)];
            } else {
              randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
            }
            shownMemes2.push(randomFile);
            if (randomFile.endsWith('.jpg')) {
              memeContainer.innerHTML = `<img id="meme" src="${folder}${randomFile}" alt="Random Image">`;
            } else if (randomFile.endsWith('.mp4')) {
              memeContainer.innerHTML = `<video id="meme" src="${folder}${randomFile}" autoplay   loop></video>`;
            }
          } if (swipeCount > 10 && swipeCount < 16) {
            localStorage.setItem("memeCount", swipeCount);
            const folder = "./memes/slapstick/";
            const availableFiles = mediaFiles3.filter(file => !shownMemes3.includes(file));
            let randomFile;
            if (availableFiles.length === 0) {
              shownMemes3 = [];
              randomFile = mediaFiles3[Math.floor(Math.random() * mediaFiles3.length)];
            } else {
              randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
            }
            shownMemes3.push(randomFile);
            if (randomFile.endsWith('.jpg')) {
              memeContainer.innerHTML = `<img id="meme" src="${folder}${randomFile}" alt="Random Image">`;
            } else if (randomFile.endsWith('.mp4')) {
              memeContainer.innerHTML = `<video id="meme" src="${folder}${randomFile}" autoplay   loop></video>`;
            }
          } if (swipeCount == 16) {
            localStorage.setItem("memeCount", swipeCount);
            location.assign('./betweenPages/index.html');
          }
          if (swipeCount > 16 && swipeCount < 21) {
            localStorage.setItem("memeCount", swipeCount);
            const folder = "./memes/lightDarkHumor/";
            const availableFiles = mediaFiles4.filter(file => !shownMemes4.includes(file));
            let randomFile;
            if (availableFiles.length === 0) {
              shownMemes4 = [];
              randomFile = mediaFiles4[Math.floor(Math.random() * mediaFiles4.length)];
            } else {
              randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
            }
            shownMemes4.push(randomFile);
            if (randomFile.endsWith('.jpg')) {
              memeContainer.innerHTML = `<img id="meme" src="${folder}${randomFile}" alt="Random Image">`;
            } else if (randomFile.endsWith('.mp4')) {
              memeContainer.innerHTML = `<video id="meme" src="${folder}${randomFile}" autoplay   loop></video>`;
            }
          } if (swipeCount > 20 && swipeCount < 29 ) {
            localStorage.setItem("memeCount", swipeCount);
            const folder = "./memes/darkDarkHumor/";
            const availableFiles = mediaFiles5.filter(file => !shownMemes5.includes(file));
            let randomFile;
            if (availableFiles.length === 0) {
              shownMemes5 = [];
              randomFile = mediaFiles5[Math.floor(Math.random() * mediaFiles5.length)];
            } else {
              randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
            }
            shownMemes5.push(randomFile);
            if (randomFile.endsWith('.jpg')) {
              memeContainer.innerHTML = `<img id="meme" src="${folder}${randomFile}" alt="Random Image">`;
            } else if (randomFile.endsWith('.mp4')) {
              memeContainer.innerHTML = `<video id="meme" src="${folder}${randomFile}" autoplay   loop></video>`;
            }
          }
          //if statement om door te gaan naar de eind pagina
          if (swipeCount == 29) {
            location.assign('../end/index.html');
          }
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

//Gaat elke seconde controleren of er een swipe gedetecteerd is
//Als er 90 seconden geen swipe plaatsvind reset de installatie door terug naar start te gaan
setInterval(function () {
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