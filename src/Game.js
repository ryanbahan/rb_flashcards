const util = require('./util');

const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = null;
  }

  printMessage(deck, round) {
      console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }

  printQuestion(round) {
      util.main(round);
  }

  start() {
    var round = new Round();
    round.newRound();
    this.currentRound = round;
    this.printMessage(round.deck, round);
    this.printQuestion(round);
    // console.log(this.currentRound);
  }
}

module.exports = Game;
