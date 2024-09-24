/*
INTRO
create deck
shuffle deck
deal two cards each to user and com

USER TURN
check user cards to see if he win/bust
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
*/

var deck = generateDeck();
var gameMode = "dealCards";
var playerCards = [];
var comCards = [];

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

    gameMode = "playerEndOrDrawCard";

    return (
      "Your cards:<br>" +
      playerCards[0].name +
      " of " +
      playerCards[0].suit +
      "<br>" +
      playerCards[1].name +
      " of " +
      playerCards[1].suit +
      '<br><br>Enter "e" to end turn<br>Enter "d" to draw another card'
    );
    // Player chooses whether end turn or draw more cards
  } else if (gameMode == "playerEndOrDrawCard") {
    if (input == "d") {
      playerCards.push(deck.pop());

      return (
        "Your cards:<br>" +
        playerCards[0].name +
        " of " +
        playerCards[0].suit +
        "<br>" +
        playerCards[1].name +
        " of " +
        playerCards[1].suit +
        "<br>" +
        playerCards[2].name +
        " of " +
        playerCards[2].suit +
        '<br><br>Enter "e" to end turn<br>Enter "d" to draw another card'
      );
    }
    if (input == "e") {
      return "Turn ended.";
    }
  }
};

// Deck Generator
function generateDeck() {
  var deck = [];
  var suits = ["clubs", "diamonds", "hearts", "spades"];

  for (var i = 0; i < suits.length; i++) {
    for (var j = 1; j <= 13; j++) {
      var cardName = j;

      if (j == 1) {
        cardName = "Ace";
      }

      if (j == 11) {
        cardName = "Jack";
      }

      if (j == 12) {
        cardName = "Queen";
      }

      if (j == 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: suits[i],
        rank: j,
      };
      deck.push(card);
    }
  }

  return deck;
}

function getShuffledDeck(deck) {
  for (var i = 0; i < deck.length; i++) {
    var card = deck[i];
    var randomDraw = randomCard();
    deck[i] = randomDraw;
    deck[deck.indexOf(randomDraw)] = card;
  }

  return deck;
}

var randomCard = function () {
  var randomInt = Math.floor(Math.random() * deck.length);
  var randomCard = deck[randomInt];
  return randomCard;
};
