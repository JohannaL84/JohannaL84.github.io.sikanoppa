//Alustetaan muuttujat
let players = [];
let currentPlayerList = 0;
let gameScore = 0;
let diceCounter = 1;
let winScore = 100;

//Aloitetaan peli
function startGame() {
    const playerCounter = parseInt(document.getElementById("players").value);
    
    // Tarkistetaan pelaajamäärä, onko sallittu määrä syötettu oikein
        if (isNaN(playerCounter) || playerCounter < 2 || playerCounter > 5) {
            alert("Hei, huomioi pelaajien määrä! Peliin voi kerrallaan osallistua 2-5 pelaajaa.");
            return;
         }

    // Alustetaan lista pelaajista ja tehdään muuttuja nimille prompt- valintaikkunalla, johon pelaajan on syötettävä nimensä
        diceCounter = parseInt(document.getElementById("diceCount").value);
        for (let i = 0; i < playerCounter; i++) {
            const name = prompt(`Anna pelaajan ${i + 1} nimi:`);
            players.push({ name: name, score: 0 });

            if (name === "" ) {
                alert("Unohditko laittaa nimesi?")
                return
            }
        }

    // Määritellään ID:t
        document.getElementById("playerList").innerHTML = players.map(p => `<p>${p.name}: ${p.score} pistettä</p>`).join('');
        document.getElementById("setup").style.display = "none";
        document.getElementById("game").style.display = "block";
        updateGameInfo();
    }

    // Tehdään funktio, joka heitetään noppaa/noppia
    function rollDice() {
        document.getElementById("pig").style.textAlign = "center";
        const pig = document.getElementById("pig");
        pig.classList.remove("rotate");
        void pig.offsetWidth;
        pig.classList.add("rotate");

        // Näyttää heitot ja laskee pisteet
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = diceCounter === 2 ? Math.floor(Math.random() * 6) + 1 : 0;
        document.getElementById("diceResult").textContent = `Heitit ${dice1}${diceCounter === 2 ? ' ja ' + dice2 : ''}`;
            
        if (diceCounter === 1) {
            if (dice1 === 1) {
                gameScore = 0;
                switchPlayer();
            } else {
                gameScore += dice1;
            }
        } else {
            if (dice1 === 1 && dice2 === 1) {
                gameScore += 25;
            } else if (dice1 === 1 || dice2 === 1) {
                gameScore = 0;
                switchPlayer();
            } else if (dice1 === dice2) {
                 gameScore += (dice1 + dice2) * 2;
            } else {
                gameScore += dice1 + dice2;
            }
        }

        //Näyttää heittojen välissä kertyneet pisteet, ns. vuoropisteet
        document.getElementById("gameScore").textContent = `Vuoropisteitä on ${gameScore}`;
    }

    // Tehdään funktio, joka pitää pisteet
    function hold() {
        players[currentPlayerList].score += gameScore;
        gameScore = 0;
        if (players[currentPlayerList].score >= winScore) {
            alert(`Onnea ${players[currentPlayerList].name}, olet voittaja!`);
            resetGame();
         } else {
            switchPlayer();
        }
    }

    // Funktio, joka vaihtaa pelaajaa 
    function switchPlayer() {
        currentPlayerList = (currentPlayerList + 1) % players.length;
        gameScore = 0;
        updateGameInfo();
    }

    //Tehdään funktio, joka pävivittää pelin kulkua tekstiohjein
    function updateGameInfo() {
        document.getElementById("playerList").innerHTML = players.map(p => `<p>${p.name}: ${p.score} pistettä</p>`).join('');
        document.getElementById("currentPlayer").textContent = `Vuorossa ${players[currentPlayerList].name}`;
        document.getElementById("gameScore").textContent = `Vuoropisteitä on ${gameScore}`;
    }

    // Tehdään funktio, joka resetoi pelin kun pelaaja haluaa aloittaa pelin alusta
    function resetGame() {
        players = [];
        currentPlayerList = 0;
        gameScore = 0;
        document.getElementById("setup").style.display = "block";
        document.getElementById("game").style.display = "none";
        document.getElementById("error").style.display = "none";
    }