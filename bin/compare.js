import _ from 'lodash'
import fs from 'fs'
import colors from 'colors'

let newStats = JSON.parse(fs.readFileSync('new.json'))
let oldStats = JSON.parse(fs.readFileSync('old.json'))

_.mapKeys(oldStats, (value, key) => {
  let oldSalary = oldStats[key]['Salary']
  let newSalary = newStats[key]['Salary']

  if(oldSalary > newSalary) {
    console.log(`${key} ${oldSalary} --> ${newSalary}`.red)
  } else if (oldSalary < newSalary) {
    console.log(`${key} ${oldSalary} --> ${newSalary}`.green)
  }
})
