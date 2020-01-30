const util = require('./util');
const data = require('./data');
const questionsChooser = data.questionOptions;

const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound = null;
  }

  async printNewGameMessage(questionsChooser) {
    let questionsChoice = await util.introPrompt(questionsChooser);
    return questionsChoice;
  }

  printQuestion(round) {
      util.main(round);
  }

  async start() {
    let questionsChoice = await this.printNewGameMessage(questionsChooser);
    var round = new Round();
    round.newRound(questionsChoice);
    this.currentRound = round;
    this.printQuestion(round);
  }
}

module.exports = Game;
