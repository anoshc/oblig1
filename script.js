// Henter html elementene med id og class navn
const brikke = document.getElementById("brikke");
const spillSlutt = document.getElementById("spill-slutt");
const spillVinner = document.getElementsByClassName("spill-vinner");
const prøvIgjen = document.getElementsByClassName("prøv-igjen");

// Definerer en variabel som velger alle rutene i html med class-navnet "rute" 
const ruter = document.querySelectorAll(".rute");

// Definerer variabler for spiller X og O, og en tredje variabel som sjekker hvem sin tur det er
const playerX = "X";
const playerO = "O";
let tur = playerX;

//
const brettState = Array(ruter.length);
brettState.fill(null);

// Legger til eventListner til hver rute på brettet
ruter.forEach((rute) => rute.addEventListener("click", ruteClick));


// Innfører funksjonen "ruteClick", som vil se hvilken rute som er klikket på
function ruteClick(event) {
    if (spillSlutt.classList.contains("synlig")) {
        return;
    }

    const rute = event.target;
    const ruteNummer = rute.dataset.index;

    //if its not equal to blank it means an x or o must be inside there
    if (rute.innerText != "") {
        return;
    }

    //check who´s turn it is
    if (tur === playerX) {
        rute.innerText = playerX;
        brettState[ruteNummer - 1] = playerX;
        tur = playerO;
    } else {
        rute.innerText = playerO;
        brettState[ruteNummer - 1] = playerO;
        tur = playerX;
    }

    vinnerStatus();
}

// Sjekker om det blir vinn eller uavgjort
function vinnerStatus() {
    for (const vinnerForhold of vinneKombinasjoner) {
        const { kombinasjon, brikkeClass } = vinnerForhold;
        //const kombinasjon = vinnerForhold.kombinasjon;
        //const brikke = vinnerForhold.brikke;

        const ruteVerdi1 = brettState[kombinasjon[0] - 1];
        const ruteVerdi2 = brettState[kombinasjon[1] - 1];
        const ruteVerdi3 = brettState[kombinasjon[2] - 1];

        if (
            ruteVerdi1 != null &&
            ruteVerdi1 === ruteVerdi2 &&
            ruteVerdi1 === ruteVerdi3
        ) {
            brikke.classList.add(brikkeClass);
        }
    }


}

const vinneKombinasjoner = [
    { kombinasjon: [1, 2, 3], brikkeClass: "horisontal-linje-1" },
    { kombinasjon: [4, 5, 6], brikkeClass: "horisontal-linje-2" },
    { kombinasjon: [7, 8, 9], brikkeClass: "horisontal-linje-3" },

    { kombinasjon: [1, 4, 7], brikkeClass: "vertikal-linje-1" },
    { kombinasjon: [2, 5, 8], brikkeClass: "vertikal-linje-2" },
    { kombinasjon: [3, 6, 9], brikkeClass: "vertikal-linje-3" },

    { kombinasjon: [1, 5, 9], brikkeClass: "diagonal-linje-1" },
    { kombinasjon: [3, 5, 9], brikkeClass: "diagonal-linje-2" }
]