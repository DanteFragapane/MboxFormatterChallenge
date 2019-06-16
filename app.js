// Imports
const readline = require('readline')
const fs = require('fs')

// Variables
const mbox = './MboxFormatterChallenge/mbox.full'
let emailBool = false // This variable will be used inside the reading logic to determine which lines are part of an email
let email = []
let emailList = []

// =====================
// =====================

const emailCompile = function emailCompile (emailList, emaili) {
  emailList.push(email.join('\n'))
  return emailList
}

// Read the file line by line
let lineReader = readline.createInterface({
  input: fs.createReadStream(mbox)
})

// Event listener for each line that was read
lineReader.on('line', function (line) {
  if (line.match(/^From /)) {
    emailBool = true
  } else if (emailBool) {
    email.push(line)
  }
  if (email && line.match(/1.4.0.g6f2b/)) {
    emailBool = false
    emailList = emailCompile(emailList, email)
  }
})

lineReader.on('close', function () {
  // console.log(email)
})
