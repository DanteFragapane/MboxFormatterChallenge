// Imports
const readline = require('readline')
const fs = require('fs')

// Variables
const mbox = './mbox.full'

// =====================
// =====================

// Read the file line by line
let lineReader = readline.createInterface({
  input: fs.createReadStream(mbox)
})

// Event listener for each line that was read
lineReader.on('line', function (line) {
  console.log(line)
})
