const video = document.getElementById('video');
const emotionImage = document.getElementById('emotionPicture');
const lowerText = document.getElementById('emotionText');
const detectedEmotion = document.getElementById('detectedEmotion');
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
        detectedEmotion.textContent = "Surprised"
        lowerText.textContent = 'Precies een beetje verrast he!';
      } else if (dominantExpression == "disgusted") {
        localStorage.setItem("emotion", 2);
        emotionImage.src = "./emotions/disgusted.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        detectedEmotion.textContent = " Disgusted"
        lowerText.textContent = 'Damn, is er iets vies ofzo?';
      } else if (dominantExpression == "fearful") {
        localStorage.setItem("emotion", 3);
        emotionImage.src = "./emotions/fearful.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        detectedEmotion.textContent = " Fearful"
        lowerText.textContent = 'Bent gij serieus bang? Bent gij een BITCH?!?!';
      } else if (dominantExpression == "sad") {
        localStorage.setItem("emotion", 4);
        emotionImage.src = "./emotions/sad.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        detectedEmotion.textContent = " Sad"
        lowerText.textContent = 'Ziet er een beetje sad uit. Bent gij een BITCH?!?!';
      } else if (dominantExpression == "angry") {
        localStorage.setItem("emotion", 5);
        emotionImage.src = "./emotions/angry.jpg"
        emotionImage.style.border = "5px solid #5FA5B6";
        detectedEmotion.textContent = " Angry";
        lowerText.textContent = 'Waarom zo boos?';
      } else if (dominantExpression == "happy") {
        localStorage.setItem("emotion", 6);
        emotionImage.src = "./emotions/happy.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        detectedEmotion.textContent = " Happy"
        lowerText.textContent = 'Precies gelukkig he, ik ben blij voor u!';
      } else {
        localStorage.setItem("emotion", 7);
        emotionImage.src = "./emotions/neutral.jpg";
        emotionImage.style.border = "5px solid #5FA5B6";
        detectedEmotion.textContent = " Neutral"
        lowerText.textContent = 'Niks interessant nee? Gewoon neutraal?';
      }
      verder.style.display = "flex";
    } 
  }, 3000);
  
});
