const util = require('./util');

const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = null;
  }

  printQuestion(round) {
      util.main(round);
  }

  start() {
    var round = new Round();
    round.newRound();
    this.currentRound = round;
    this.printQuestion(round);
  }
}

module.exports = Game;
