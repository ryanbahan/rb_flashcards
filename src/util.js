const inquirer = require('inquirer');

const genList = (round) => {
  let card = round.returnCurrentCard();

  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

    if(!round.returnCurrentCard()) {
      let nextRound = round.getIncorrectCards();
      if (nextRound === true) {
        round.endRound();
        round.newRound();
      }
      main(round);
    } else {
      main(round);
    }
}

async function introPrompt(questionsChooser) {

  const getQuestion = await inquirer.prompt({
    type: 'rawlist',
    message: questionsChooser.question,
    name: 'questionChoice',
    choices: questionsChooser.answers
  });

  const questionsChoice = await getQuestion.questionChoice;

  var questionId = questionsChooser.answersIds.find
  (answer => answer.name === questionsChoice).id;

  return questionId;
}

module.exports.main = main;

module.exports.introPrompt = introPrompt;
