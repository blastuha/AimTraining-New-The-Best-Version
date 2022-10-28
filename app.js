const startBtn = document.querySelector('#start')
// достаем объект кнопки начать игру по id
const screens = document.querySelectorAll('.screen')
// обозначаем экраны (их насколько)
const timeList = document.querySelector('#time-list')
// обозначаем кнопки времени (сразу весь список)
const timeEl = document.querySelector('#time')
// обозначаем сколько осалось времени у игрока
const board = document.querySelector('#board')
// обозначаем доску для шаров
let time = 0  
// задаем переменную времени
let score = 0
// переменная счета

const playAgainBtn = document.querySelector('.playAgainOn')
const scoreEl = document.querySelector('#score')
// const playAg = document.querySelector('.playAgain')

let timerId = null

startBtn.addEventListener('click', (event) => {
// в href прописан # и добавляет в конец ссылки, нужно его убрать строчкой ниже
    event.preventDefault()
    // обращаемся к первому экрану, добавляем к нему .class 'up'
    screens[0].classList.add('up')
})

// добавляем слушатель события сразу на все кнопки времени
// через if и метод contains (а есть ли у элемента timeList определенный class .timbe-btn?)
timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time')) // обращаемся к data-time + через parseInt переводим строчку в число. далее значение присваиваем переменной time, которая будет хранить в себе выбранное пользователем время
        screens[1].classList.add('up')  //смена экрана 
        startGame() // вызываем функцию старта Игры
    }
})

//записываем points, при попадании по circle
board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) { // если event содержит class 'circle'
        score++ // засчитываем score
        event.target.remove() // пропадает круг
        createRandomCircle() // создаем новый
    }
}) 


// вызываем игру
function startGame() {
    timerId = setInterval(decreaseTime, 1000) // вызываем функцию (ум. врем) каждую секунду через setInerval
    createRandomCircle() // вызываем функцию создания кружков
    timeEl.innerHTML = `00:${time}` // обозначение выбранного времени
}

function decreaseTime() {    
    if (time === 0) { // если время 0, gameover
        clearTimeout(timerId)

        finishGame()
    } else {
        let current = --time // уменьшение времени на 1
        if (current < 10) { // если меньше 10сек то + '0'
            current = `0${current}`
        }
        timeEl.innerHTML = `00:${current}`
    }
}

// Добавляем текст в html со счётом
function finishGame() {
    board.classList.add('hide')
    timeEl.parentNode.classList.add('hide') //удаляем timeEl, но остается слово 'Осталось', через parentNode удаляем родителя h3 (ставим прозрачность 0, через метод remove скачок какой-то)
    // board.innerHTML = `<h1 id="scoreEl">Счет: <span class="primary">${score}</span></h1>`
    board.innerHTML = ''
    scoreEl.textContent = score
    scoreEl.parentNode.classList.remove('hide')

    setTimeout(playAgain, 2000)
    // playAgain() // загорается кнопка
}

// создаем кружки в поле
function createRandomCircle() {
    const circle = document.createElement('div') //создаем новый див в html
    
    const size = getRandomNumber(10, 60) // задаем через функцию случ. размер кружка
    const {width, height} = board.getBoundingClientRect() // деструктуриация width, heigt, которые мы достали через метод getBoundingClientReact
    const x = getRandomNumber(0, width - size) // задаем координаты появления кружка (доска размером 500x500)
    const y = getRandomNumber(0, height - size) // -size кружка, чтобы он не выходил за границы доски

    circle.classList.add('circle') // вызываем классы
    circle.style.width = `${size}px` // ширина круга
    circle.style.height = `${size}px` // высота круга (они одинаковые)
    circle.style.top = `${y}px` // координаты кружка
    circle.style.left = `${x}px`

    board.append(circle) // обращаемся к борду и вставляем в конец борда (circle)

    setCircleColor(circle)
}

// функция определения случайного диапазона размера кружка
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function playAgain() {
    scoreEl.parentNode.classList.add('hide')
    playAgainBtn.classList.remove('hide')

    score = 0

    playAgainBtn.addEventListener('click', (event) => {
        playAgainBtn.classList.add('hide')
        board.classList.remove('hide')
        timeEl.parentNode.classList.remove('hide')
        screens[1].classList.remove('up')
    })


    board.parentNode.appendChild(playAgainBtn)
}

playAg?.addEventListener('click', (event) => {
    if (event.target.classList.contains('playAgainOn')) {
        // board.innerHTML = ``
        scoreEl.parentNode.remove()
        playAg.classList.remove('playAgainOn')
        playAg.classList.remove('playAgain')
        screens[1].classList.remove('up')
    }
    // screens[1].classList.remove('up')
    // setTimeout(startGame, 2000)
})

//---- Добавляем цвета


function randomColor() {
    const colors = ['coral', 'lightblue', 'lightgreen', 'lightyellow', 'pink', 'crimson']

    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

function setCircleColor(el) {
    const color = randomColor()
    el.style.backgroundColor = color
    el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}