const form = document.querySelector('form')
const nameInput = document.getElementById('firstName')
const surnameInput = document.getElementById('lastName')
const saveBtn = document.getElementById('save-btn')
const resetBtn = document.getElementById('reset-btn')

const savedList = document.getElementById('saved')
let pElements = []

const FULLNAME_MEMORY = 'fullname-memory'

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = nameInput.value
  const surname = surnameInput.value
  const fullname = name + ' ' + surname

  localStorage.setItem(FULLNAME_MEMORY, fullname)
  console.log('Saved')

  let input = document.createElement('p')
  input.innerText = `${fullname}`
  savedList.appendChild(input)

  pElements.push(input)
})

resetBtn.addEventListener('click', () => {
  const accept = confirm('Do you want to clear all your saved names?')

  if (accept) {
    console.log('cleared memory')
    localStorage.removeItem(FULLNAME_MEMORY)
    form.reset()
    pElements.forEach((p) => p.remove())
    pElements.length = 0
  } else {
    console.log('refused')
  }
})

const startTimer = function () {
  const startingTime = new Date().getTime()
  sessionStorage.setItem('startingTime', startingTime)
  timer()
}

// const showStartingTime = function () {
//   const startingTime = sessionStorage.getItem('startingTime')
//   console.log(`startingTime: ${new Date(parseInt(startingTime)).toString()}`)
// }

const timer = function () {
  const startingTime = sessionStorage.getItem('startingTime')
  setInterval(() => {
    const current = new Date().getTime()
    const elapsed = current - startingTime
    const convertToSeconds = Math.floor(elapsed / 1000)
    sessionStorage.setItem('ELAPSED_TIME', convertToSeconds)
    //console.log(`Current session elapsed time: ${convertToSeconds}s`)
  }, 1000)
}

startTimer()
// showStartingTime()