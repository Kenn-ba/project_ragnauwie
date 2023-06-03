//Functie om toegang te krijgen tot de camera en weer te geven
navigator.mediaDevices.getUserMedia({ video: true })
.then(function (stream) {
  var videoElement = document.getElementById('videoElement');
  videoElement.srcObject = stream;
})
.catch(function (error) {
  console.error("Error accessing the webcam: ", error);
});

//Functie die na 30 seconden navigeert naar de start pagina
function navigateToAnotherPage() {
    setTimeout(function() {
      location.assign("../start/index.html"); // Replace with your desired URL
    }, 30000); // 30 seconds delay in milliseconds (1000 milliseconds = 1 second)
  }