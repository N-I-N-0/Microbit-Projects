let xArray: number[] = []
let newGrid: number[][] = []
let grid: number[][] = []
let gridSize = 0
let cameraTopLeftY = 0
let cameraTopLeftX = 0
gridSize = 15
grid = [[0, 0]]
newGrid = [[0, 0]]
for (let a = 0; a <= gridSize; a++) {
    xArray = [0]
    for (let i = 0; i < gridSize; i++) {
        xArray.push(0)
    }
    grid[a] = xArray
    newGrid[a] = xArray
}
grid[1][2] = 1
grid[2][1] = 1
grid[2][2] = 1
grid[2][3] = 1
grid[3][2] = 1
function getPopulation(x = 0, y = 0) {
    let population = 0
    if (x > 0 && x < gridSize && y > 0 && y < gridSize) {
        if (grid[y - 1][x - 1] == 1) { population++ }
        if (grid[y - 1][x] == 1) { population++ }
        if (grid[y - 1][x + 1] == 1) { population++ }
        if (grid[y][x - 1] == 1) { population++ }
        if (grid[y][x + 1] == 1) { population++ }
        if (grid[y + 1][x - 1] == 1) { population++ }
        if (grid[y + 1][x] == 1) { population++ }
        if (grid[y + 1][x + 1] == 1) { population++ }
    } else if (x == 0 && y > 0 && y < gridSize) {
        if (grid[y - 1][x] == 1) { population++ }
        if (grid[y - 1][x + 1] == 1) { population++ }
        if (grid[y][x + 1] == 1) { population++ }
        if (grid[y + 1][x] == 1) { population++ }
        if (grid[y + 1][x + 1] == 1) { population++ }
    } else if (x == gridSize && y > 0 && y < gridSize) {
        if (grid[y - 1][x - 1] == 1) { population++ }
        if (grid[y - 1][x] == 1) { population++ }
        if (grid[y][x] == 1) { population++ }
        if (grid[y + 1][x - 1] == 1) { population++ }
        if (grid[y + 1][x] == 1) { population++ }
    } else if (x > 0 && x < gridSize && y == 0) {
        if (grid[y][x - 1] == 1) { population++ }
        if (grid[y][x + 1] == 1) { population++ }
        if (grid[y + 1][x - 1] == 1) { population++ }
        if (grid[y + 1][x] == 1) { population++ }
        if (grid[y + 1][x + 1] == 1) { population++ }
    } else if (x > 0 && x < gridSize && y == gridSize) {
        if (grid[y - 1][x - 1] == 1) { population++ }
        if (grid[y - 1][x] == 1) { population++ }
        if (grid[y - 1][x + 1] == 1) { population++ }
        if (grid[y][x - 1] == 1) { population++ }
        if (grid[y][x + 1] == 1) { population++ }
    } else if (x == 0 && y == 0) {
        if (grid[y][x + 1] == 1) { population++ }
        if (grid[y + 1][x] == 1) { population++ }
        if (grid[y + 1][x + 1] == 1) { population++ }
    } else if (x == gridSize && y == 0) {
        if (grid[y][x - 1] == 1) { population++ }
        if (grid[y + 1][x + 1] == 1) { population++ }
        if (grid[y + 1][x] == 1) { population++ }
    } else if (x == 0 && y == gridSize) {
        if (grid[y - 1][x] == 1) { population++ }
        if (grid[y - 1][x + 1] == 1) { population++ }
        if (grid[y][x + 1] == 1) { population++ }
    } else if (x == gridSize && y == gridSize) {
        if (grid[y - 1][x - 1] == 1) { population++ }
        if (grid[y - 1][x] == 1) { population++ }
        if (grid[y][x - 1] == 1) { population++ }
    }
    return population
}
basic.forever(function () {
    basic.clearScreen()
    for (let y1 = cameraTopLeftY; y1 < cameraTopLeftY + 5; y1++) {
        for (let x1 = cameraTopLeftX; x1 < cameraTopLeftX + 5; x1++) {
            if (grid[y1][x1] == 1) {
                led.plot(x1 - cameraTopLeftX, y1 - cameraTopLeftY)
            }
        }
    }
    if (input.acceleration(Dimension.X) <= -150) {
        if (cameraTopLeftX > 0) {
            cameraTopLeftX -= 1
        }
    } else if (input.acceleration(Dimension.X) >= 150) {
        if (cameraTopLeftX < gridSize - 5) {
            cameraTopLeftX += 1
        }
    }
    if (input.acceleration(Dimension.Y) <= -150) {
        if (cameraTopLeftY > 0) {
            cameraTopLeftY -= 1
        }
    } else if (input.acceleration(Dimension.Y) >= 150) {
        if (cameraTopLeftY < gridSize - 5) {
            cameraTopLeftY += 1
        }
    }
    basic.pause(500)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        for (let y = 0; y <= gridSize; y++) {
            for (let x = 0; x <= gridSize; x++) {
                let populationAroundSelf = getPopulation(x, y)
                if (populationAroundSelf < 2) {
                    newGrid[y][x] = 0
                } else if (populationAroundSelf >= 2 && populationAroundSelf <= 3) {
                    if (grid[y][x] = 1) {
                        newGrid[y][x] = 1
                    } else {
                        newGrid[y][x] = 0
                        if (populationAroundSelf == 3) {
                            newGrid[y][x] = 1
                        }
                    }
                } else if (populationAroundSelf > 3) {
                    newGrid[y][x] = 0
                }
            }
        }
        grid = newGrid
        basic.pause(2000)
    }
})

