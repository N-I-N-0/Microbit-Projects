let ballDirectionY = 0
let ballDirectionX = 0
let player2points = 0
let player1points = 0
let speed = 0
let player2direction = 0
let player1direction = 0
let ballY = 0
let player2 = 0
let player1 = 0
let ballX = 0
let playing = false
let mode = "temperature"
let fBallX = 2
let fBallY = 2
let fBallDirectionX = 1
let fBallDirectionY = 0.5
let fBallSpeed = 500
let compassNumber = 0

input.onButtonPressed(Button.AB, function () {
    if (!(playing) && mode == "game") {
        ballX = 2
        ballY = 2
        ballDirectionX = Math.randomRange(0, 1) * 2 - 1
        player1 = 0
        player2 = 4
        player1direction = -1
        player2direction = 1
        player1points = 0
        player2points = 0
        playing = true
    }
})

basic.showLeds(`
    # . # . #
    . . . . .
    # . # . #
    . . . . .
    # . # . #
    `)
player1direction = -1
player2direction = 1
player1 = 0
player2 = 4
ballX = 2
ballY = 2
ballDirectionX = Math.randomRange(0, 1) * 2 - 1
ballDirectionY = Math.randomRange(0, 1) * 2 - 1
speed = 600

basic.forever(function () {
    if (mode == "game") {
        if (playing) {
            led.unplot(ballX, ballY)
            led.plot(0, player1)
            led.plot(4, player2)
            if (ballX == 0 && ballDirectionX == -1) {
                if (ballY == player1) {
                    ballDirectionX *= -1
                } else {
                    ballX = 2
                    ballY = 2
                    ballDirectionX *= -1
                    player2points += 1
                    led.plot(2, 2)
                    basic.pause(1000)
                    led.unplot(2, 2)
                }
            } else if (ballX == 4 && ballDirectionX == 1) {
                if (ballY == player2) {
                    ballDirectionX *= -1
                } else {
                    ballX = 2
                    ballY = 2
                    ballDirectionX *= -1
                    player1points += 1
                    led.plot(2, 2)
                    basic.pause(1000)
                    led.unplot(2, 2)
                }
            }
            if (ballY == 0 && ballDirectionY == -1) {
                ballDirectionY *= -1
            } else if (ballY == 4 && ballDirectionY == 1) {
                ballDirectionY *= -1
            }
            ballX += ballDirectionX
            if (Math.randomBoolean()) {
                ballY += ballDirectionY
            }
            led.plot(ballX, ballY)
            basic.pause(speed)
            if (player1points == 9 || player2points == 9) {
                playing = false
            }
        } else {
            basic.showString("P1: " + player1points + "  P2: " + player2points)
            if (input.buttonIsPressed(Button.AB)) { playing = true }
            if (!playing) { basic.showString("Press") }
            if (input.buttonIsPressed(Button.AB)) { playing = true }
            if (!playing) { basic.showString("A&B") }
            if (input.buttonIsPressed(Button.AB)) { playing = true }
            if (!playing) { basic.showString("to") }
            if (input.buttonIsPressed(Button.AB)) { playing = true }
            if (!playing) { basic.showString("restart") }
            if (input.buttonIsPressed(Button.AB)) { playing = true }
            if (!playing) { basic.showString("the") }
            if (input.buttonIsPressed(Button.AB)) { playing = true }
            if (!playing) { basic.showString("game!") }
        }
    } else if (mode == "temperature") {
        basic.showString(input.temperature() + "C")
    } else if (mode == "flying ball") {
        led.unplot(fBallX, fBallY)
        if (fBallX == 0) {
            fBallDirectionX = 1
        } else if (fBallX == 4) {
            fBallDirectionX = -1
        }
        if (fBallY == 0) {
            fBallDirectionY = 1
        } else if (fBallY == 4) {
            fBallDirectionY = -1
        }
        if (input.acceleration(Dimension.X) > 150 && fBallX > 0 && fBallX < 4) {
            fBallDirectionX = 1
        } else if (input.acceleration(Dimension.X) < -150 && fBallX > 0 && fBallX < 4) {
            fBallDirectionX = -1
        } else if (input.acceleration(Dimension.X) > 150 && !(fBallX < 4)) {
            fBallDirectionX = 0
        } else if (input.acceleration(Dimension.X) < -150 && !(fBallX > 0)) {
            fBallDirectionX = 0
        }
        if (input.acceleration(Dimension.Y) > 150 && fBallY > 0 && fBallY < 4) {
            fBallDirectionY = 1
        } else if (input.acceleration(Dimension.Y) < -150 && fBallY > 0 && fBallY < 4) {
            fBallDirectionY = -1
        } else if (input.acceleration(Dimension.Y) > 150 && !(fBallY < 4)) {
            fBallDirectionY = 0
        } else if (input.acceleration(Dimension.Y) < -150 && !(fBallY > 0)) {
            fBallDirectionY = 0
        }
        fBallX += fBallDirectionX
        fBallY += fBallDirectionY

        led.plot(fBallX, fBallY)
        fBallSpeed = 500
        if (input.acceleration(Dimension.X) > 250 || input.acceleration(Dimension.X) < -250 || input.acceleration(Dimension.Y) > 250 || input.acceleration(Dimension.Y) < -250) {
            fBallSpeed = 400
        }
        if (input.acceleration(Dimension.X) > 450 || input.acceleration(Dimension.X) < -450 || input.acceleration(Dimension.Y) > 450 || input.acceleration(Dimension.Y) < -450) {
            fBallSpeed = 300
        }
        if (input.acceleration(Dimension.X) > 650 || input.acceleration(Dimension.X) < -650 || input.acceleration(Dimension.Y) > 650 || input.acceleration(Dimension.Y) < -650) {
            fBallSpeed = 200
        }
        if (input.acceleration(Dimension.X) > 850 || input.acceleration(Dimension.X) < -850 || input.acceleration(Dimension.Y) > 850 || input.acceleration(Dimension.Y) < -850) {
            fBallSpeed = 100
        }
        if (input.acceleration(Dimension.X) > 1050 || input.acceleration(Dimension.X) < -1050 || input.acceleration(Dimension.Y) > 1050 || input.acceleration(Dimension.Y) < -1050) {
            fBallSpeed = 10
        }
        basic.pause(fBallSpeed)
    } else if (mode == "light level") {
        basic.showString("Light: " + input.lightLevel())
    } else if (mode == "compass") {
        if (input.compassHeading() > 337.5 && input.compassHeading() <= 360) {
            compassNumber = 0
        }
        if (input.compassHeading() > 0 && input.compassHeading() <= 22.5) {
            compassNumber = 0
        }
        if (input.compassHeading() > 22.5 && input.compassHeading() <= 67.5) {
            compassNumber = 7
        }
        if (input.compassHeading() > 67.5 && input.compassHeading() <= 112.5) {
            compassNumber = 6
        }
        if (input.compassHeading() > 112.5 && input.compassHeading() <= 157.5) {
            compassNumber = 5
        }
        if (input.compassHeading() > 157.5 && input.compassHeading() <= 202.5) {
            compassNumber = 4
        }
        if (input.compassHeading() > 202.5 && input.compassHeading() <= 247.5) {
            compassNumber = 3
        }
        if (input.compassHeading() > 247.5 && input.compassHeading() <= 292.5) {
            compassNumber = 2
        }
        if (input.compassHeading() > 292.5 && input.compassHeading() <= 337.5) {
            compassNumber = 1
        }
        basic.showArrow(compassNumber)
    }
})

basic.forever(function () {
    if (playing) {
        if (input.buttonIsPressed(Button.A)) {
            led.unplot(0, player1)
            if (player1 == 0) {
                player1direction = player1direction * -1
            } else if (player1 == 4) {
                player1direction = player1direction * -1
            }
            player1 += player1direction
            led.plot(0, player1)
        }
        if (input.buttonIsPressed(Button.B)) {
            led.unplot(4, player2)
            if (player2 == 0) {
                player2direction = player2direction * -1
            } else if (player2 == 4) {
                player2direction = player2direction * -1
            }
            player2 += player2direction
            led.plot(4, player2)
        }
        basic.pause(50)
    }
})

input.onGesture(Gesture.Shake, function () {
    if (mode == "temperature") {
        mode = "game"
        playing = true
        ballX = 2
        ballY = 2
    } else if (mode == "game") {
        mode = "flying ball"
        playing = false
        basic.clearScreen()
        led.plot(2, 2)
    } else if (mode == "flying ball") {
        if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
            mode = "light level"
            playing = false
            basic.clearScreen()
        } else {
            led.unplot(fBallX, fBallY)
            fBallX = 2
            fBallY = 2
            fBallDirectionX = 1
            fBallDirectionY = 1
            led.plot(2, 2)
        }
    } else if (mode == "light level") {
        mode = "compass"
    } else if (mode == "compass") {
        mode = "temperature"
    }
})
