const brikke = document.getElementById("brikke");
const spillSlutt = document.getElementById("spill-slutt");
const tekstVinner = document.getElementById("tekst-vinner");
const prøvIgjen = document.getElementById("prøv-igjen");

const ruter = document.querySelectorAll(".rute")
const playerX = "X";
const playerO = "O";
let tur = playerX;

const spillState = Array(ruter.length);
spillState.fill(null);

ruter.forEach(function(rute) {
    rute.addEventListener("click", ruteClick);
})

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
        spillState[ruteNummer] = playerX;
        tur = playerO;
    } else {
        rute.innerText = playerO;
        spillState[ruteNummer] = playerO;
        tur = playerX;
    }

    vinnerStatus();
}

// Funksjon som sjekker om det er en vinner
function vinnerStatus() {
    for (const vinnerForhold of vinnerKombinasjon) {

        const { kombinasjon, brikkeClass } = vinnerForhold;
        let ruteVerdi1 = spillState[kombinasjon[0]];
        let ruteVerdi2 = spillState[kombinasjon[1]];
        let ruteVerdi3 = spillState[kombinasjon[2]];

        if (
            ruteVerdi1 != null &&
            ruteVerdi1 === ruteVerdi2 &&
            ruteVerdi1 === ruteVerdi3
        ) {
            brikke.classList.add(brikkeClass);
            popUp(ruteVerdi1);
            return;
        }
    }

    // Funksjon som sjekker om det er uavgjort


    const markertRuter = spillState.every((rute) => rute !== null);
    if (markertRuter) {
        popUp(null);
    }

}

function popUp(vinnerMelding) {
    let melding = "Uavgjort";
    if (vinnerMelding != null) {
        melding = `Vinneren er spiller ${vinnerMelding}`;
    }
    spillSlutt.className = "synlig";
    tekstVinner.innerText = melding;
}

prøvIgjen.addEventListener("click", startIgjen);

function startIgjen() {
    brikke.className = "brikke";
    spillSlutt.className = "skjult";
    spillState.fill(null);
    ruter.forEach((rute) => (rute.innerText = ""));
    tur = playerX;
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