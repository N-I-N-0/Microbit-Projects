let snake = [[2, 2], [2, 3], [2, 4]];
let direction = 2;
let field = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
let maxApplesOnMap = 2
let apples = [[0, 3]]
let eatsApple = false
let i = 0
let playing = true
let newFieldArray = [0, 0]
let speedOfSnake = 500

basic.forever(function () {
    if (playing) {
        if (speedOfSnake > 100) {
            //speedOfSnake -= 2
        }
        placeApple()

        newFieldArray = newField()

        //basic.showNumber(newFieldArray[1])

        snake.push(newFieldArray)

        if (!eatsApple) {
            snake.shift()
        } else {
            eatsApple = false
        }

        field = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
        for (let i = 0; i < snake.length - 1; i++) {
            field[snake[i][1]][snake[i][0]] = 1
        }

        for (let i = 0; i < apples.length; i++) {
            field[apples[i][1]][apples[i][0]] = 2
        }

        if (field[newFieldArray[1]][newFieldArray[0]] == 1) {
            playing = false
        } else if (field[newFieldArray[1]][newFieldArray[0]] == 2) {
            eatApple()
        }
        field[snake[snake.length - 1][1]][snake[snake.length - 1][0]] = 3

        basic.clearScreen()
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                if (field[y][x] == 1) {
                    led.plot(x, y)
                }
                if (field[y][x] == 2) {
                    led.plotBrightness(x, y, 191)
                }
                if (field[y][x] == 3) {
                    led.plotBrightness(x, y, 127)
                }
            }
        }
        basic.pause(speedOfSnake)
    } else {
        basic.showString("U died with a length of: " + snake.length)
    }
})

function eatApple() {
    eatsApple = true

    let newApples = [[0]]
    newApples.shift()
    newApples.shift()
    let applesLength = apples.length
    for (let i = 0; i < applesLength; i++) {
        let a = apples.shift()
        if (a[0] == newFieldArray[0] && a[1] == newFieldArray[1]) {
        } else {
            newApples[i] = a
        }
    }
    apples = newApples
}

function newField() {
    let newX = 0
    let newY = 0
    let currentHead = snake[snake.length - 1]

    if (direction == 0) {
        if (snake[snake.length - 1][1] == 0) {
            newY = 4
            newX = snake[snake.length - 1][0]
        } else {
            newY = snake[snake.length - 1][1] - 1
            newX = snake[snake.length - 1][0]
        }
    } else if (direction == 1) {
        if (snake[snake.length - 1][0] == 4) {
            newX = 0
            newY = snake[snake.length - 1][1]
        } else {
            newX = snake[snake.length - 1][0] + 1
            newY = snake[snake.length - 1][1]
        }
    } else if (direction == 2) {
        if (snake[snake.length - 1][1] == 4) {
            newY = 0
            newX = snake[snake.length - 1][0]
        } else {
            newY = snake[snake.length - 1][1] + 1
            newX = snake[snake.length - 1][0]
        }
    } else if (direction == 3) {
        if (snake[snake.length - 1][0] == 0) {
            newX = 4
            newY = snake[snake.length - 1][1]
        } else {
            newX = snake[snake.length - 1][0] - 1
            newY = snake[snake.length - 1][1]
        }
    }
    return [newX, newY]
}

function placeApple() {
    if (Math.randomRange(0, 20) == 5 && apples.length < maxApplesOnMap) {
        let isPlaced = false
        while (!isPlaced) {
            let appleX = Math.randomRange(0, 4)
            let appleY = Math.randomRange(0, 4)

            if (field[appleY][appleX] == 0) {
                apples.push([appleX, appleY])
                isPlaced = true
            }
        }
        return true
    } else {
        return false
    }
}

input.onButtonPressed(Button.A, function () {
    if (direction == 0) {
        direction = 3
    } else {
        direction--
    }
})

input.onButtonPressed(Button.B, function () {
    if (direction == 3) {
        direction = 0
    } else {
        direction++
    }
})

input.onGesture(Gesture.Shake, function () {
    if (!playing) {
        snake = [[2, 2], [2, 3], [2, 4]];
        speedOfSnake = 500
        playing = true
    }
})