const video = document.getElementById('video')

// Laad de modellen van het Face API-framework met behulp van Promises en Promise.all
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
]).then(startVideo);

//Functie om toegang te krijgen tot de camera en weer te geven
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

//Functie om de uitdrukking van de gebruiker te detecteren
video.addEventListener('play', () => {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const dominantExpression = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
      console.log(dominantExpression);
    }
  }, 1500);
});
