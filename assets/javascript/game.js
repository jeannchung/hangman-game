let score = 0
let oldScore = 0
let currentWord = ''
let guessLeft = 10
let hiddenWord = ''
let guessedLetters = []
const allWords = ['Genesis', 'Blondie', 'Journey'];
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


function setHiddenWord() {
    let tmpWord = ''
    for (let i = 0; i < (currentWord.length * 2); i++) {
        if (i === 0 || i % 2 === 0) {
            tmpWord += '_'
            // Underscore represents word
        }
        else {
            tmpWord += ' '
            // Blank is simply in between
        }
    }
    return tmpWord
}

function setCurrentWord() {
    let wordIndex = Math.floor(Math.random() * allWords.length)
    console.log(allWords[wordIndex])
    return allWords[wordIndex]
}

function alphaCheck(letter) {
    let result = false

    for (let i = 0; i < letters.length; i++) {
        if (letter === letters[i]) {
            return true
        }
    }
    return result
}



window.onload = function () {
    currentWord = setCurrentWord()
    hiddenWord = setHiddenWord()
    displayValues()
    console.log(currentWord)
    console.log(hiddenWord)
}



function displayValues() {
    let scoreT = document.querySelector('#wins')
    let hWord = document.querySelector('#hidden_word')
    let gLeft = document.querySelector('#guessLeft')
    let gLetters = document.querySelector('#letGuessed')

    scoreT.innerHTML = score
    hWord.innerHTML = setHiddenWord()
    gLeft.innerHTML = guessLeft
    gLetters.innerHTML = guessedLetters

}

function losing() {
    guessLeft--
    document.querySelector('#guessLeft').innerHTML = '' + guessLeft
    document.querySelector('#letGuessed').innerHTML = guessedLetters
    if (guessLeft <= 0) {
        document.querySelector('#message').innerHTML = `<h1>You lost! Press any key to try again.</h1>`
    }
}

function checkForWin() {
    winWord = hiddenWord.split(' ').join('')
    console.log(winWord)
    if(winWord === currentWord.toLowerCase()) {
        console.log("You should have won!")
        score++
        document.querySelector('#message').innerHTML = `<h1>You won! Press any key to continue.</h1>`
        document.querySelector('#wins').innerHTML = '' + score
    }
}

function reset() {
    currentWord = setCurrentWord()
    hiddenWord = setHiddenWord()
    oldScore++;
    guessLeft = 10
    guessedLetters = []
    document.querySelector('#hidden_word').innerHTML = hiddenWord
    document.querySelector('#message').innerHTML = "Press any key to get started!"
    document.querySelector('#guessLeft').innerHTML = '' + guessLeft
    document.querySelector('#wins').innerHTML = '' + score
    document.querySelector('#letGuessed').innerHTML = '' + guessedLetters.toString()
}

document.onkeyup = function (event) {
    const letter = event.key
    if (alphaCheck(letter)) {
        if (guessLeft === 0 || score > oldScore) {
            reset()
            return
        }
        // Seeing whether or not letter has been guessed already
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            console.log(guessedLetters)
            // Can check against hidden word since new letter never seen before
            let tmpWord = currentWord.toLowerCase();
            for (i = 0; i < tmpWord.length; i++) {
                if (letter === tmpWord.charAt(i)) {
                    hiddenWord = setCharAt(hiddenWord, (i * 2), letter)
                    document.querySelector('#hidden_word').innerHTML = hiddenWord
                    console.log(hiddenWord)
                } 
            }

            checkForWin()
            losing()
            // Update UI function
        }
        // If the letter isn't new, why bother checking it? We've checked it before
    }
    console.log(letter)
    //displayValues()
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index+1)
}

// CHECKKKKKKKK
// Randomly set the word from an array

// CHECKKKKKKK
// Create a UI
// Underscore for each letter and a blank space in between

// CHECKKKKISSHHHHH
// Every time a key is pressed absorb the event and check the guess
// Grab letter and compare to the current word it is set to
// If correct letter, replace the underscore with the letter

// If wrong add it to the guessed letters pile

// ALSO compare it to a set of letters we already have looked at
// This array of letters guessed are what is printed in UI

// ALSO if wrong then decrement guesses allowed 

// MESSAGES

// WHAT HAPPENS ON LOSS

// WHAT HAPPENS ON WIN