const ruter = document.querySelectorAll(".rute")
const playerX = "X";
const playerO = "O";
let tur = playerX;

const brettState = Array(ruter.length);
brettState.fill(null);

const brikke = document.getElementById("brikke");
const spillSlutt = document.getElementById("spill-slutt");
const tekstVinner = document.getElementsByClassName("tekst-vinner");
const spillIgjen = document.getElementsByClassName("prøv-igjen");

ruter.forEach((rute) => rute.addEventListener("click", ruteClick));

function ruteClick(event) {
    if (spillSlutt.classList.contains("synlig")) {
        return;
    }

    const rute = event.target;
    const ruteNummer = rute.dataset.index;
    if (rute.innerText != "") {
        return;
    }

    if (tur === playerX) {
        rute.innerText = playerX;
        brettState[ruteNummer] = playerX;
        tur = playerO;
    } else {
        rute.innerText = playerO;
        brettState[ruteNummer] = playerO;
        tur = playerX;
    }

    vinnerStatus();
}

// Funksjon som sjekker om det er en vinner
function vinnerStatus() {
    for (const vinnerForhold of vinnerKombinasjon) {

        const { kombinasjon, brikkeClass } = vinnerForhold;
        let ruteVerdi1 = brettState[kombinasjon[0]];
        let ruteVerdi2 = brettState[kombinasjon[1]];
        let ruteVerdi3 = brettState[kombinasjon[2]];

        if (
            ruteVerdi1 != null &&
            ruteVerdi1 === ruteVerdi2 &&
            ruteVerdi1 === ruteVerdi3
        ) {
            brikke.classList.add(brikkeClass);

        }
    }

}

const vinnerKombinasjon = [
    { kombinasjon: [0, 1, 2], brikkeClass: "horisontal-linje-1" },
    { kombinasjon: [3, 4, 5], brikkeClass: "horisontal-linje-2" },
    { kombinasjon: [6, 7, 8], brikkeClass: "horisontal-linje-3" },

    { kombinasjon: [0, 3, 6], brikkeClass: "vertikal-linje-1" },
    { kombinasjon: [1, 4, 7], brikkeClass: "vertikal-linje-2" },
    { kombinasjon: [2, 5, 8], brikkeClass: "vertikal-linje-3" },

    { kombinasjon: [0, 4, 8], brikkeClass: "diagonal-linje-1" },
    { kombinasjon: [2, 4, 6], brikkeClass: "diagonal-linje-2" },

]