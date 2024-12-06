module.exports = function (input) {
    const width = input.indexOf('\n')
    const height = (input.trim().length + 1) / (width + 1)
    const walls = new Set()
    let lastWall = -1
    while (true) {
        let wallIndex = input.indexOf('#', lastWall + 1)
        if (wallIndex !== -1) {
            const x = wallIndex % (width + 1)
            const y = Math.floor(wallIndex / (width + 1))
            walls.add(x + 1 + (y + 1) * (width + 1))
            lastWall = wallIndex
        } else {
            break
        }
    }

    const guardIndex = input.indexOf('^')
    const guardX = guardIndex % (width + 1)
    const guardY = Math.floor(guardIndex / (width + 1))
    

    const answers = tracePath(guardX, guardY, 0, -1, walls, width, height)

    return answers
}

function tracePath(gx, gy, dx, dy, walls, width, height) {
    const seenplaces = new Set()
    let newWalls = 0
    
    while (true) {
        const posHash = gx + 1 + (gy + 1) * (width + 1)
        seenplaces.add(posHash)

        const nextStep = gx + dx + 1 + (gy + dy + 1) * (width + 1)
        if (walls.has(nextStep)) {
            const temp = dx
            dx = -dy
            dy = temp
        } else {
            if (
                seenplaces.has(nextStep) === false &&
                checkLoop(gx, gy, dx, dy, walls, width, height, nextStep) === true
            ) {
                newWalls++
            }
            gx += dx
            gy += dy
        }
        if (gx < 0 || gx >= width || gy < 0 || gy >= height) {
            break
        }
    }
    return [seenplaces.size, newWalls]
}

function checkLoop(gx, gy, dx, dy, walls, width, height, extraWall) {
    const seenplaces = new Set()
    
    while (true) {
        const posHash = ((gx + gy * width) * 10 + dx + 1) * 10 + dy + 1
        if (seenplaces.has(posHash)) {
            return true
        } else {
            seenplaces.add(posHash)
        }

        const nextStep = gx + dx + 1 + (gy + dy + 1) * (width + 1)
        if (walls.has(nextStep) || extraWall === nextStep) {
            const temp = dx
            dx = -dy
            dy = temp
        } else {
            gx += dx
            gy += dy
        }
        if (gx < 0 || gx >= width || gy < 0 || gy >= height) {
            break
        }
    }
    return false
}