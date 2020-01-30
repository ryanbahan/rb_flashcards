const data = require('./data');
const prototypeQuestions = data.prototypeData;
const testQuestions = data.prototypeDataTwo;
const questions = [prototypeQuestions, testQuestions];

const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Card = require('../src/Card');

class Round {
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.currentTurn = null;
    this.incorrectGuesses = [];
    this.correctGuesses = [];
    this.roundStart = Date.now();
    this.roundEnd = null,
    this.questionsIndex = 0
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
  getQuestions() {
    if (questions[this.questionsIndex] === undefined) {
      this.questionsIndex = 0;
    };
    let questionSet = questions[this.questionsIndex];
    this.questionsIndex += 1;
    return questionSet;
  }
  printNewRoundMessage(deck, round) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`)
  }
  printIncorrectRoundMessage(deck, round) {
    console.log(`Still a few left! You got ${deck.countCards()} cards wrong.
-----------------------------------------------------------------------`)
  }
  resetRound() {
    this.roundStart = Date.now();
    this.turns = 0;
    this.currentTurn = null;
    this.incorrectGuesses = [];
    this.correctGuesses = [];
  }
  newRound() {
    this.resetRound();
    var questionSet = this.getQuestions();
    var cards = questionSet.map(item =>
      new Card(item.id, item.question, item.answers, item.correctAnswer));
    this.deck = new Deck(cards);
    this.printNewRoundMessage(this.deck, this);
  }
  getIncorrectCards() {
    this.deck.cards = this.incorrectGuesses;
    this.incorrectGuesses = [];
    if (this.deck.cards.length === 0) {
      return true;
    } else {
      this.printIncorrectRoundMessage(this.deck, this);
    }
  }
}

module.exports = Round;
