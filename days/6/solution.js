module.exports = function (input) {
    const width = input.indexOf('\n')
    const height = (input.trim().length + 1) / (width + 1)
    const walls = []
    let lastWall = -1
    while (true) {
        let wallIndex = input.indexOf('#', lastWall + 1)
        if (wallIndex !== -1) {
            const x = wallIndex % (width + 1)
            const y = Math.floor(wallIndex / (width + 1))
            walls.push([x, y])
            lastWall = wallIndex
        } else {
            break
        }
    }

    const guardIndex = input.indexOf('^')
    let guardPos = [
        guardIndex % (width + 1),
        Math.floor(guardIndex / (width + 1))
    ]
    let guardDelta = [0, -1]

    const part1 = tracePath(guardPos, guardDelta, walls, width, height, true)

    return [part1]
}

function tracePath(pos, delta, walls, width, height, placeWall) {
    let guardPos = pos
    let guardDelta = delta
    const seenplaces1 = new Map()
    const seenplaces2 = new Map()
    let step = 0
    const newWalls = new Set()
    
    while (true) {
        const posHash1 = guardPos[0] + guardPos[1] * width
        if (seenplaces1.has(posHash1)) {
            // loop
        } else {
            seenplaces1.set(posHash1, step)
        }

        const posHash2 = ((guardPos[0] + guardPos[1] * width) * 10 + guardDelta[0] + 1) * 10 + guardDelta[1] + 1
        if (seenplaces2.has(posHash2)) {
            return true
        } else {
            seenplaces2.set(posHash2, step)
        }
        step += 1

        if (walls.find(wall => wall[0] === (guardPos[0] + guardDelta[0]) && wall[1] === (guardPos[1] + guardDelta[1])) !== undefined) {
            guardDelta = [-guardDelta[1], guardDelta[0]]
        } else {
            if (
                placeWall &&
                seenplaces1.has(guardPos[0] + guardDelta[0] + (guardPos[1] + guardDelta[1]) * width) === false &&
                tracePath([...guardPos], [...guardDelta], [...walls, [guardPos[0] + guardDelta[0], guardPos[1] + guardDelta[1]]], width, height, false) === true) {
                newWalls.add(guardPos[0] + guardDelta[0] + (guardPos[1] + guardDelta[1]) * width)
            }
            guardPos[0] += guardDelta[0]
            guardPos[1] += guardDelta[1]
        }
        if (guardPos[0] < 0 || guardPos[0] >= width || guardPos[1] < 0 || guardPos[1] >= height) {
            break
        }
    }
    return [seenplaces1.size, newWalls.size]
}