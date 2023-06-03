const memeText = document.getElementById('memeText');

//Array met zinnen om te tonen op het meme scherm
const zinnen = [
  "Blijf kijken en swipen, de beelden worden enkel leuker en leuker.",
  "Hoe meer je blijft swipen, hoe leuker ze gaan worden.",
  "Ze worden echt alleen maar beter!",
  "Elke swipe brengt je naar een nog leuker beeld. Blijf swipen en lach hardop!",
  "De beelden worden alsmaar grappiger na elke swipe. Geniet van de humor en blijf swipen!",
  "Elke swipe brengt je dichter bij de beste beelden. Blijf genieten en laat je verbazen!",
  "Hoe meer je blijft swipen, hoe leuker ze gaan worden. Blijf kijken en ontdek de alsmaar betere beelden!",
  "Ze worden echt alleen maar beter! Blijf swipen en geniet van de steeds leukere beelden.",
  "De beelden worden steeds beter na elke swipe. Blijf swipen en word blij!",
  "De humor evolueert met elke swipe. Blijf kijken en ontdek alsmaar betere beelden!"
]

//Functie om door de array mey zinnen te gaan
//Om de 5 seconden word een zin van de array weergegeven op het scherm
//Er worden ook classes aangesproken om de zinnen in en uit te laten faden
let i = 0;

setInterval(() => {
  memeText.classList.add('fade-out');
  setTimeout(() => {
    memeText.textContent = zinnen[i];
    memeText.classList.remove('fade-out');
    memeText.classList.add('fade-in');
    setTimeout(() => {
      memeText.classList.remove('fade-in');
    }, 500);
    i = (i + 1) % zinnen.length;
  }, 500);
}, 5000);