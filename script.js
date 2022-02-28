// Henter definerte elementer fra html til javascript
const brikke = document.getElementById("brikke");
const spillSlutt = document.getElementById("spill-slutt");
const tekstVinner = document.getElementById("tekst-vinner");
const prøvIgjen = document.getElementById("prøv-igjen");

// Definerer en variabel som velger alle med class-navnet "rute".
const ruter = document.querySelectorAll(".rute")

// Definerer en konstant variabel for hver av spillerne, og en variabel som skifter mellom hvem sin tur det er. 
const playerX = "X";
const playerO = "O";
let tur = playerX;

// Definerer en variabel som inneholder en matrise, som videre inneholder hvor mange ruter som er definert.
const spillArr = Array(ruter.length);
// Matrisen setter deretter alle verdiene til null
spillArr.fill(null);

// Legger til en eventListner som er klikkbar for alle rutene på brettet, og referer til en funksjon som er definert lenger ned.
ruter.forEach(function(rute) {
    rute.addEventListener("click", ruteKlikk);
})

// Definerer en funksjon:
// 1. den sjekker om en melding, med spillet er over, har blitt synlig.
// 2. og videre ikke gjør det mulig å trykke på de resterende rutene.
function ruteKlikk(event) {
    if (spillSlutt.classList.contains("synlig")) {
        return;
    }

    // Finner ut hvilken av rutene som ble trykket på.
    const rute = event.target;
    // Finner ut av hvilket rute nummer som ble trykket på.
    const ruteNummer = rute.dataset.index;
    // Sjekker hvis teksten ikke allerede har en verdi fra før.
    if (rute.innerText != "") {
        return;
    }

    // Sjekker hvem sin tur det er.
    if (tur === playerX) {
        rute.innerText = playerX;
        spillArr[ruteNummer] = playerX;
        tur = playerO;
    } else {
        rute.innerText = playerO;
        spillArr[ruteNummer] = playerO;
        tur = playerX;
    }

    vinnerStatus();
}

// Funksjon som sjekker om det er en vinner
function vinnerStatus() {
    for (const vinnerForhold of vinnerKombinasjon) {

        const { kombinasjon, brikkeClass } = vinnerForhold;
        let ruteVerdi1 = spillArr[kombinasjon[0]];
        let ruteVerdi2 = spillArr[kombinasjon[1]];
        let ruteVerdi3 = spillArr[kombinasjon[2]];

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


    const markertRuter = spillArr.every((rute) => rute !== null);
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
    spillArr.fill(null);
    ruter.forEach((rute) => (rute.innerText = ""));
    tur = playerX;
}

// Objekt som beskriver de ulike kombinasjonene det er mulig å vinne, og deretter lager en vinner-strek ut i fra kombinasjonen.
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