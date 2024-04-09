const form = document.querySelector('form')
const nameInput = document.getElementById('firstName')
const surnameInput = document.getElementById('lastName')
const saveBtn = document.getElementById('save-btn')
const resetBtn = document.getElementById('reset-btn')

const savedList = document.getElementById('saved')
let pElements = []

const FULLNAME_MEMORY = 'fullname-memory'

function loadSavedNames() {
  const savedNames = JSON.parse(localStorage.getItem(FULLNAME_MEMORY) || '[]')
  savedNames.forEach((fullname) => {
    addNameToList(fullname)
  })
}

function addNameToList(fullname) {
  let input = document.createElement('p')
  input.innerText = fullname
  savedList.appendChild(input)
  pElements.push(input)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = nameInput.value
  const surname = surnameInput.value
  const fullname = `${name} ${surname}`

  const savedNames = JSON.parse(localStorage.getItem(FULLNAME_MEMORY) || '[]')
  savedNames.push(fullname)
  localStorage.setItem(FULLNAME_MEMORY, JSON.stringify(savedNames))
  console.log('Saved')

  addNameToList(fullname)
})

resetBtn.addEventListener('click', () => {
  const accept = confirm('Do you want to clear all your saved names?')

  if (accept) {
    console.log('cleared memory')
    localStorage.removeItem(FULLNAME_MEMORY)
    form.reset()
    pElements.forEach((p) => p.remove())
    pElements.length = []
  } else {
    console.log('refused')
  }
})

document.addEventListener('DOMContentLoaded', loadSavedNames)

//timer ------------

const START_MEMORY = 'starting-time'

const startTimer = function () {
  let startingTime = sessionStorage.getItem(START_MEMORY)

  if (!startingTime) {
    startingTime = new Date().getTime()

    sessionStorage.setItem(START_MEMORY, startingTime)
  }
  timer()
}

const timer = function () {
  const startingTime = parseInt(sessionStorage.getItem(START_MEMORY), 10)
  setInterval(() => {
    const current = new Date().getTime()
    const elapsed = current - startingTime
    const ELAPSEDTIME_MEMORY = 'elapsed-time'
    const convertToSeconds = Math.floor(elapsed / 1000)
    document.getElementById('timer').innerText = `${convertToSeconds}`
    sessionStorage.setItem(ELAPSEDTIME_MEMORY, convertToSeconds.toString())
  }, 1000)
}

startTimer()
