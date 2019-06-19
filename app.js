// Imports
const readline = require('readline')
const fs = require('fs')

// Variables
const mbox = 'mbox.full'
let emailBool = false // This variable will be used inside the reading logic to determine which lines are part of an email
let email = []
let emailList = []
let header = ''
let signature = ''

// =====================
// =====================

const emailCompile = function emailCompile(emailList, header, emaili) {
  emailList.push({
    header: header,
    message: email.join('\n')
  })
  return emailList
}

// Read the file line by line
let lineReader = readline.createInterface({
  input: fs.createReadStream(mbox)
})

// Event listener for each line that was read
lineReader.on('line', function (line) {
  if (line.match(/^From /)) {
    email = []
    header = line
    emailBool = true
  } else if (emailBool) {
    email.push(line)
  }
  if (email && line.match(/1.4.0.g6f2b/)) {
    signature = line
    emailBool = false
    emailList = emailCompile(emailList, header, email)
  }
})

lineReader.on('close', function () {
  console.log('Done!')
})
