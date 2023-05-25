const video = document.getElementById('video');
const emotionImage = document.getElementById('emotionPicture');
const lowerText = document.getElementById('emotionText');
const verder = document.getElementById('continue');


Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
]).then(startVideo);


function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  setTimeout(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const dominantExpression = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
      console.log(dominantExpression);
      if (dominantExpression == "surprised") {
        localStorage.setItem("emotion", 1);
        emotionImage.src = "./emotions/surprised.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Ze verrassen u precies een beetje he!';
      } else if (dominantExpression == "disgusted") {
        localStorage.setItem("emotion", 2);
        emotionImage.src = "./emotions/disgusted.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Precies geen grote fan he!';
      } else if (dominantExpression == "fearful") {
        localStorage.setItem("emotion", 3);
        emotionImage.src = "./emotions/fearful.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Memes zijn toch niet eng? bitch';
      } else if (dominantExpression == "sad") {
        localStorage.setItem("emotion", 4);
        emotionImage.src = "./emotions/sad.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Niet echt blij aan het worden he.';
      } else if (dominantExpression == "angry") {
        localStorage.setItem("emotion", 5);
        emotionImage.src = "./emotions/angry.jpg"
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Serieus boos aan het worden van memes?';
      } else if (dominantExpression == "happy") {
        localStorage.setItem("emotion", 6);
        emotionImage.src = "./emotions/happy.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Ze lijken te werken he!';
      } else {
        localStorage.setItem("emotion", 7);
        emotionImage.src = "./emotions/neutral.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        lowerText.textContent = 'Zijn ze niet leuk genoeg ofzo?';
      }
      verder.style.display = "flex"; 
    }
  }, 1000);
});
