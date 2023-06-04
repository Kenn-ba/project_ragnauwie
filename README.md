﻿

# Project Ragnauwie

![alt text](Installatie.JPG "Installatie")

## Achtergrond

Het concept voor onze installatie is om te zien hoe humor is veranderd doorheen de tijd omdat sommige grapjes "woke" zijn hebben wij een installatie gemaakt waar je humor wordt getest aan de hand van memes videos en gif's die wij je tonen. De memes worden darker & darker hoe meer je naar rechts swiped.

De hardware die werd gebruikt waren meerdere libary's die we vonden op github het meeste werk van de programmeer taal was javascript.

## Benodigdheden

* Computer
* Visual Code
* Raspberry Pi
* RGB LED Matrix Panel - 64x64 x3
* The RGB LED Matrix Controller
* Ethernet Cable
* Webcam HD
* ViewBoard Interactive Touchscreen
* Karton
* Hout
* Stickers
* Verf Graffiti
* Plakband
* Pizza dozen x7

## Stap 1: Design

Als thema hebben we Teenage Mutant Ninja Turtles genomen. Dit speelt af in NewYorkCity. Om dit duidelijk te maken hebben we elk groepslid gelinkt met een ninja naar gelang onze karakter. 

* Michelangelo = Bilal
* Raffello = Kenneth
* Donatello = Armin

De NewYork stijl zie je ook in de materialen. Graffiti en verf dat gebruikt is op het karton. Stickers die overal geplakt zijn. Ook hebben we een grote riooldeksel dat een referentie is naar de thuisbasis van de turtles. Led lights kom je vaak tegen in NewYork. Denk maar bijvoorbeeld aan Times Square. En niet te vergeten de pizza dozen die overal hangen. Dit is referentie naar Michelangelo (een enorme pizza-fan).

De kartonnen muren die het scherm gedeeltelijk bedekken zijn gesneden met behulp van dit zelfgemaakte template. Hiervan zijn er twee uitgesneden en aan elkaar geplakt.

<img width="300" alt="ragnauwie-karton-print-a" src="https://github.com/Kenn-ba/project_ragnauwie/assets/127089430/58aeb1b9-5e88-442e-9e4e-2298cc989ff6"><img width="300" alt="ragnauwie-karton-print-b" src="https://github.com/Kenn-ba/project_ragnauwie/assets/127089430/f2576c3c-89a7-4690-a12f-b9bb90ca9038">


In één van de kartonnen is er een kleine gat manueel uitgesneden om de rasperryPi te verbinden met de RGB LED Matrix panelen. Zo konden we de rPi verstoppen zodat het niet zichtbaar is voor de gebruikers. De rPi is dan uiteindelijk geplakt met lijm en voor extra steun was er plakband gebruikt. (dit is oke omdat het in onze thema past) Op het andere karton was er een houten plaat geplakt (met lijm) met 'Cancel Culture Canceled' op geschreven. Dit was er op geschreven door gebruik te maken van een lasercutter.

<img width="300" alt="cancel-culture-canceled" src="https://github.com/Kenn-ba/project_ragnauwie/assets/127089430/927b51a1-a3f3-4958-bcd5-498d3271e1ed">

De stickers zijn gemaakt met behulp van MidJourney. Vervolgens zijn ze gestoken in Illustrator om ze net zoals de karton de juiste laagnamen te geven. (De stickers zijn geprint geweest en uitgesneden met machines.)

<img width="300" alt="sticker" src="https://github.com/Kenn-ba/project_ragnauwie/assets/127089430/99f36156-6e38-4a77-85db-e62be7d175d2"><img width="300" alt="stickers" src="https://github.com/Kenn-ba/project_ragnauwie/assets/127089430/b821c4ec-832b-4e82-8735-1e4844f2d164">

## Stap 2: Code

We maken gebruik van 2 libary's:
* MediaPipe Hands
* face-api

### Start pagina

De eerste pagina die te zien is op de installatie is heel simpel.
Op vlak van javascript doet het maar 3 dingen:
* camera feed tonen
* door een array van zinnen gaan om te laten zien op het scherm 
* detecteren of de user swipet om door te gaan naar de volgende pagina
















## Stap 3: Led Installatie

Eerst moeten we de LED-matrix in zijn werking zetten.

### Zet de LED-matrix in werking

Om te beginnen moet de kabel voor de voeding die bij de set is meegeleverd, worden aangesloten op de LED-matrix en de voeding.
Als er meerdere matrices met elkaar verbonden moeten worden, ga dan als volgt te werk: Er kunnen maximaal drie matrices parallel worden bediend op de 40-pins 

Let op: Pas bij het aansluiten van meerdere matrices de voeding dienovereenkomstig aan!

### Tussenplaatsing RGB Matrix Controller

Als alternatief voor het rechtstreeks verbinden van de matrices via de GPIO-strip op de Raspberry Pi, kunt u ook de RGB-Matrix controller gebruiken om maximaal drie matrices parallel aan te sturen. Ook hier is er de mogelijkheid om extra matrices in serie aan te sluiten.

Het voordeel van het aansturen via het controllerbord is de aanzienlijk eenvoudigere verbindingsmogelijkheid. Bovendien kan het controllerbord de Raspberry Pi van stroom voorzien en is er al een ventilator geïnstalleerd die voor voldoende koeling zorgt.

<img width="300" alt="sticker" src="https://www.reichelt.de/magazin/wp-content/uploads/2020/07/Zwischenschaltung-des-Matrix-Controllerboards.png">


