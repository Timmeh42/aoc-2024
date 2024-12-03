module.exports = function (input) {
    const matches = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g)
    let part1 = 0
    let part2 = 0
    let doing = true
    for (const match of matches) {
        if (match[0] === 'do()') {
            doing = true
        } else if (match[0] === 'don\'t()') {
            doing = false
        } else {
            part1 += Number(match[1]) * Number(match[2])
            if (doing) {
                part2 += Number(match[1]) * Number(match[2])
            }
        }

    }
    return [part1, part2]
}
