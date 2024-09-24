/*
INTRO
create deck
shuffle deck
deal two cards each to user and com

USER TURN
check user cards to see if he win/bust
- 3 paths:
-- bust - end turn
-- blackjack - win
-- less than 21 - choose to hit or stand

give user option to draw card or end turn
- if draw card, check user cards to see if he win/bust

(Add logic to determine whether Aces should have value of 1 or 11 for a given hand.)

Note: 
if user blackjack, might still be tie if com blackjacks too
if user bust, might still be tie if com busts too

COM TURN
- Gets given a card depending on whether he's above or below 17

(Add logic to determine whether Aces should have value of 1 or 11 for a given hand.)

DECIDE WINNER
check winner based on
- who's combined value is closer to 21
- who bust/blackjack


NOTE: 
- To also account for different suits having different values?
- Add end-game state? (e.g. press "p" to play another round)
*/

var deck = generateDeck();
var gameMode = "dealCards";
var playerCards = [];
var comCards = [];
var playerHandValue = 0;

var main = function (input) {
  // Deal cards to player and com
  if (gameMode == "dealCards") {
    getShuffledDeck(deck);

    for (var i = 0; i < 2; i++) {
      playerCards.push(deck.pop());
    }

    for (var i = 0; i < 2; i++) {
      comCards.push(deck.pop());
    }

    for (var j = 0; j < playerCards.length; j++) {
      playerHandValue += playerCards[j].value;
    }

    return (
      "Your hand:<br>" +
      seeHand(playerCards) +
      "<br>Your hand value: " +
      handValue(playerCards) +
      "<br><br>" +
      handOutcome(handValue(playerCards))
    );

    // Player chooses whether end turn or draw more cards
  } else if (gameMode == "playerHitOrStand") {
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
    } else if (input == "s") {
      return "Turn ended. Computer's turn.";
    }
  }
  // End of game mode - gives option to replay
  else if ((gameMode = "end")) {
    if (input == "p") {
      gameMode = "dealCards";
    }
  }
};

// Generate deck
function generateDeck() {
  var deck = [];
  var suits = ["clubs", "diamonds", "hearts", "spades"];

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
  for (var i = 0; i < hand.length; i++) {
    totalValue += hand[i].value;
  }
  return totalValue;
};

// Get hand outcome
var handOutcome = function (handValue) {
  if (handValue == 21) {
    gameMode = "end";
    return "Blackjack! You won!";
  } else if (handValue > 21) {
    gameMode = "comTurn";
    return "Bust!";
  } else {
    gameMode = "playerHitOrStand";
    return 'Enter "h" to hit<br>Enter "s" to stand';
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
