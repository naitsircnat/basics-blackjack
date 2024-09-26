/*
NOTE: 
- To also account for different suits having different values?
*/

var deck = generateDeck();
var gameMode = "welcome";
var playerCards = [];
var comCards = [];
var playerHandValue = 0;

var main = function (input) {
  // Deal cards to player and com
  if (gameMode == "welcome") {
    gameMode = "dealCards";
    return "Welcome to Blackjack! Click Submit to deal cards.";
  } else if (gameMode == "dealCards") {
    playerCards.length = 0;
    comCards.length = 0;

    getShuffledDeck(deck);

    for (var i = 0; i < 2; i++) {
      playerCards.push(deck.pop());
    }

    for (var i = 0; i < 2; i++) {
      comCards.push(deck.pop());
    }

    return (
      "Your hand:<br>" +
      seeHand(playerCards) +
      "<br>Your hand value: " +
      handValue(playerCards) +
      "<br><br>" +
      handOutcome(handValue(playerCards))
    );

    // Player chooses whether to hit or stand
  } else if (gameMode == "playerHitOrStand") {
    // player hits
    if (input == "h") {
      playerCards.push(deck.pop());

      return (
        "Your hand:<br>" +
        seeHand(playerCards) +
        "<br>Your hand value: " +
        handValue(playerCards) +
        "<br><br>" +
        handOutcome(handValue(playerCards))
      );
      // player stands
    } else if (input == "s") {
      gameMode = "comTurn";
      return "You chose to stand.<br><br>Click Submit to pass turn to computer.";
    }
    // computer's turn
  } else if ((gameMode = "comTurn")) {
    if (input == "") {
      while (handValue(comCards) < 17) {
        comCards.push(deck.pop());
      }

      return (
        "Computer hand:<br>" +
        seeHand(comCards) +
        "<br>Computer hand value: " +
        handValue(comCards) +
        "<br><br>" +
        gameOutcome(handValue(comCards))
      );
    }
  }
};

// HELPER FUNCTIONS

// Generate deck
function generateDeck() {
  var deck = [];
  var suits = ["♣️ ", "♦️", "🖤", "♠️"];

  for (var i = 0; i < suits.length; i++) {
    for (var j = 1; j <= 13; j++) {
      var cardName = j;
      var cardValue = j;

      if (j == 1) {
        cardName = "Ace";
        cardValue = 11;
      }

      if (j == 11) {
        cardName = "Jack";
        cardValue = 10;
      }

      if (j == 12) {
        cardName = "Queen";
        cardValue = 10;
      }

      if (j == 13) {
        cardName = "King";
        cardValue = 10;
      }

      var card = {
        name: cardName,
        suit: suits[i],
        value: cardValue,
      };
      deck.push(card);
    }
  }

  return deck;
}

// Get shuffled deck
function getShuffledDeck(deck) {
  for (var i = 0; i < deck.length; i++) {
    var card = deck[i];
    var randomDraw = randomCard();
    deck[i] = randomDraw;
    deck[deck.indexOf(randomDraw)] = card;
  }

  return deck;
}

// Draw random card
var randomCard = function () {
  var randomInt = Math.floor(Math.random() * deck.length);
  var randomCard = deck[randomInt];
  return randomCard;
};

// Get hand value
var handValue = function (hand) {
  var totalValue = 0;
  var totalValueTillAce = 0;

  for (var i = 0; i < hand.length; i++) {
    // if ace is found, determines whether ace should be 1 instead of 11
    if (hand[i].name == "Ace") {
      aceIndex = i;

      for (var j = 0; j <= aceIndex; j++) {
        totalValueTillAce += hand[i].value;
      }
      if (totalValueTillAce > 21) {
        hand[i].value = 1;
      }
    }
    totalValue += hand[i].value;
  }

  return totalValue;
};

// Get hand outcome
var handOutcome = function (handValue) {
  if (handValue == 21) {
    gameMode = "comTurn";
    return "Blackjack! 🎉🎉🎉 <br><br>Click Submit to pass turn to computer";
  } else if (handValue > 21) {
    gameMode = "comTurn";
    return "Bust! 💥💥💥 <br><br>Click Submit to pass turn to computer";
  } else {
    gameMode = "playerHitOrStand";
    return 'Enter "h" to hit 🤲  <br>Enter "s" to stand 🚫';
  }
};

// See cards in hand
var seeHand = function (hand) {
  var output = "";
  for (var i = 0; i < hand.length; i++) {
    output += hand[i].name + " of " + hand[i].suit + "<br>";
  }
  return output;
};

// Get computer/game outcome
var gameOutcome = function (comHandValue) {
  gameMode = "dealCards";

  if (
    comHandValue == 21 &&
    (handValue(playerCards) > 21 || handValue(playerCards) < 21)
  ) {
    return "Computer won with Blackjack 🥶 <br><br>Click Submit to play again";
  } else if (comHandValue == 21 && handValue(playerCards) == 21) {
    return "Computer Blackjacked too! It's a draw! ⚔️ <br><br>Click Submit to play again";
  } else if (comHandValue > 21 && handValue(playerCards) > 21) {
    return "Computers busts too! It's a draw! ⚔️ <br><br>Click Submit to play again";
  } else if (comHandValue > 21 && handValue(playerCards) < 21) {
    return (
      "Your hand value: " +
      handValue(playerCards) +
      "<br><br>You won! 🤩🤩🤩<br><br>Click Submit to play again"
    );
  } else if (comHandValue < 21 && handValue(playerCards) > 21) {
    return (
      "Your hand value: " +
      handValue(playerCards) +
      "<br><br>Computer won 🥶<br><br>Click Submit to play again"
    );
  } else if (
    comHandValue < 21 &&
    playerHandValue < 21 &&
    handValue(playerCards) < comHandValue
  ) {
    return (
      "Your hand value: " +
      handValue(playerCards) +
      "<br><br>Computer won 🥶<br><br>Click Submit to play again"
    );
  } else if (
    comHandValue < 21 &&
    playerHandValue < 21 &&
    comHandValue == handValue(playerCards)
  ) {
    return (
      "Your hand value: " +
      handValue(playerCards) +
      "<br><br>It's a draw! ⚔️<br><br>Click Submit to play again"
    );
  } else {
    return (
      "Your hand value: " +
      handValue(playerCards) +
      "<br><br>You won! 🤩🤩🤩 <br><br>Click Submit to play again"
    );
  }
};
