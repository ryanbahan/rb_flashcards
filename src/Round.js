const Turn = require('../src/Turn');
// const Game = require('../src/Game');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.currentTurn = null;
    this.incorrectGuesses = [];
    this.correctGuesses = [];
    this.roundStart = Date.now();
    this.roundEnd = null
  }
  returnCurrentCard() {
      return this.deck.cards[0];
  }
  takeTurn(guess) {
    this.turns += 1;
    this.currentTurn = new Turn(guess, this.returnCurrentCard());
    var card = this.deck.cards.shift();
    var guessOutcome = this.currentTurn.evaluateGuess();
    if (guessOutcome === false) {
      this.incorrectGuesses.push(card);
    } else {
      this.correctGuesses.push(card);
    }
    return this.currentTurn.giveFeedback();
  }
  calculatePercentCorrect() {
    return Math.round((this.correctGuesses.length / this.turns) * 100);
  }
  calculateRoundTime() {
    var seconds = Math.floor((this.roundEnd - this.roundStart) / 1000);
    var minutes = Math.floor(seconds/60);
    seconds = seconds - (minutes * 60);
    return `${minutes} minutes and ${seconds} seconds`
  }
  endRound() {
    this.roundEnd = Date.now();
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly in ${this.calculateRoundTime()}!
-----------------------------------------------------------------------`);
  }
  // restartRound() {
  //   game.start();
  // }
}

module.exports = Round;
