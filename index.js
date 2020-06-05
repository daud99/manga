var cards = ["2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S", "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S", "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S"
,"10C", "10D", "10H", "10S", "AC", "KC", "JC", "QC", "AD", "KD", "JD", "QD", "AH", "KH", "JH", "QH", "AS", "KS", "JS", "QS"];

var gameState = false;
var play = document.querySelector(".play-icon");
var backdrop = document.querySelector(".backdrop");
var error_model = document.querySelector(".model");
var card = document.querySelector(".card");
var selectedCard = document.querySelector(".card-input");

var rand, current_card, current_player;
init();
play.addEventListener("click", function() {
    if(!gameState) {
        gameState = true;
        if(cards.includes(selectedCard.value.toUpperCase())) {
            selectedCard.disabled = true;
            card.style.display = "block";       
            for (var i = 0; i < 52; i++) {
             rand = Math.floor(Math.random() * cards.length-1);
             current_card = cards[rand];
             card.src = "/images/" + current_card + ".png";
             if (selectedCard.value.toUpperCase() === current_card) {
                 document.querySelector(".player-heading__sm").textContent = "player " + current_player;
                 if (window.innerWidth <= 850) {
                     error_model.style.display = "block";
                     backdrop.style.display = "block";
                     showDialog(false, "HURRAY!", "Player " + current_player + " WON!");
                 } else {
                     var winner = retrunElement(".player-div__" + current_player + " .player-heading");
                     winner.textContent = "player " + current_player + " WINNER!";
                     winner.style.color = "red";
                     winner.classList.add("mark");
                     gameState = true;
                 }
                 break;
             } 
             cards = removeItemOnce(cards, rand);
             retrunElement(".player-div__" + current_player + " .player-heading").classList.remove("mark");
             current_player === 1? current_player = 2: current_player = 1;
             retrunElement(".player-div__" + current_player + " .player-heading").classList.add("mark");
             
            }
        } else {
           showDialog(true, "ERROR","Invalid card Selected. In order to see the valid card options kindly click the info icon on the top right corner.");
           gameState = false;
        }
    } else {
        showDialog(true, "ERROR","To play again start new game.");
        gameState = false;
    }
});


error_model.addEventListener("click", function() {
        error_model.style.display = "none";
        backdrop.style.display = "none";
});

function removeItemOnce(arr, index) { 
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function init() {
    current_player = (Math.round(Math.random()) + 1);
    if (window.innerWidth <= 850) {
        document.querySelector(".player-heading__sm").textContent = "player " + (current_player);
    } else {
        retrunElement(".player-div__1 .player-heading").classList.remove("mark");
        retrunElement(".player-div__2 .player-heading").classList.remove("mark");
        retrunElement(".player-div__" + current_player + " .player-heading").classList.add("mark");
        retrunElement(".player-div__1 .player-heading").textContent = 'player 1';
        retrunElement(".player-div__2 .player-heading").textContent = 'player 2';
        retrunElement(".player-div__1 .player-heading").style.color = "#D4AF37";
        retrunElement(".player-div__2 .player-heading").style.color = "#D4AF37";
    }
    card.style.display = "none";
    gameState = false;
    selectedCard.value = "";
    selectedCard.disabled = false;
    error_model.style.display = "none";
    backdrop.style.display = "none";
    card.src = "";
}

function showDialog(icon, title="", description="") {
    error_model.style.display = "block";
    backdrop.style.display = "block";
    icon === true ? retrunElement(".error-icon").style.display = "block": retrunElement(".error-icon").style.display = "none";
    if(title !== "") retrunElement(".model-title").textContent = title;
    if(description !== "") retrunElement(".model-description").innerHTML = description;
}

document.querySelector(".game-heading").addEventListener("click", init);

document.querySelector(".help-icon__sm").addEventListener("click", function(){
    // alert("hello");
    showDialog(false, "HELP!", "You have to select the card such as<br> King Diamonds = KD <br> ACE HEARTS = AH <br> Three Spade = 3S");

});

document.querySelector("#help-icon").addEventListener("click", function(){
    // alert("lolz");
    showDialog(false, "HELP!", "You have to select the card such as<br> King Diamonds = KD <br> ACE HEARTS = AH <br> Three Spade = 3S");
});


// document.querySelector(".help-icon__sm").addEventListener("click", showDialog(false, "HELP!", "You have to select the card for example<br> King Diamonds = KD <br> ACE HEARTS = AH <br> Three Spade = 3S"));

// document.querySelector("#help-icon").addEventListener("click", showDialog(false, "HELP!", "You have to select the card for example<br> King Diamonds = KD <br> ACE HEARTS = AH <br> Three Spade = 3S"));

function retrunElement(clas) {
    return document.querySelector(clas);
}



