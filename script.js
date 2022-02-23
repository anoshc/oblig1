// Henter html elementene med id og class navn
const strek = document.getElementById("strek");
const spillSlutt = document.getElementsByClassName("spill-slutt");
const spillVinner = document.getElementsByClassName("spill-vinner");
const prøvIgjen = document.getElementsByClassName("prøv-igjen");

// Definerer en variabel som velger alle rutene i html med class-navnet "rute" 
const ruter = document.querySelectorAll(".rute");

// Definerer variabler for spiller X og O, og en tredje variabel som sjekker hvem sin tur det er
const playerX = "X";
const playerO = "O";
let tur = playerX;
