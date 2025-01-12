// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

let word = "";

const oldPointStructure = {
   // 0: [" "],
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   // let letterPoints = "";
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            // letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            letterPoints += pointValue;
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   word = input.question("Enter a word to score: ");
   return word;
   // return console.log(oldScrabbleScorer(userWord));
   // return console.log(simpleScorer(userWord));
   // return console.log(vowelBonusScorer(userWord));
};



function simpleScorer(word) {
   return word.length;
};

function vowelBonusScorer(word) {
   let vowels = ["A", "E", "I", "O", "U"];
   let vowelScore = 3;
   let wordScore = 0;
   let wordArr = [];
   let vowelCheck = word.toUpperCase();
   wordArr = vowelCheck.split("");
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(wordArr[i])) {
         wordScore = vowelScore + wordScore;
      } else {
         wordScore = wordScore + 1;
      }

   }
   wordArr.join("");
   return wordScore;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += Number(newPointStructure[word[i]]);
   }
   return letterPoints;
};

const scoringAlgorithms = [

   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },

   {
      name: "Bonus Vowels Score",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },

   {
      name: "Scrabble Score",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }

];

function scorerPrompt() {
   let numInput = input.question(`
   Which scoring algorithm would you like to use?

      0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
      1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
      2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
   
      Please Enter 0, 1, or 2: 
`);

   while (numInput < 0 || numInput > 2 || isNaN(numInput)) {
      numInput = input.question("Invalid entry... Please enter 0, 1, or 2!: ");
   }
   console.log(`Score for '${word}': ${scoringAlgorithms[numInput].scorerFunction(word, newPointStructure)}`);
}

function transform(oldPointStructure) {
   let letterPoints = [];
   for (let pointValue in oldPointStructure) {
   //    let letters = oldPointStructure[pointValue];
   //    for (let i = 0; i < letters.length; i++) {
   //       letterPoints[letters[i].toLowerCase()] = Number(pointValue);
   //    }
   // }
   // return letterPoints;
      for(let i = 0; i < oldPointStructure[pointValue].length; i++) {
         let letters = oldPointStructure[pointValue][i];
            letters = letters.toLowerCase();
            letterPoints[`${letters}`] = Number(pointValue);
      }
   }
      return letterPoints;
};



let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure);
function runProgram() {
   initialPrompt();
   scorerPrompt();
   // console.log(typeof(transform(oldPointStructure)));
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
