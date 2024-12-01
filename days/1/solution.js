module.exports = function (input) {
    const column1 = input.match(/^\d+/gm).map(Number).toSorted()
    const column2 = input.match(/\d+$/gm).map(Number).toSorted()
    let part1 = 0
    let part2 = 0
    const freq1 = new Map()
    const freq2 = new Map()
    for (let row = 0; row < column1.length; row++) {
        part1 += Math.abs(column1[row] - column2[row])

        freq1.set(column1[row], (freq1.get(column1[row]) || 0) + 1)
        freq2.set(column2[row], (freq2.get(column2[row]) || 0) + 1)
    }
    for (const [k, v] of freq1.entries()) {
        part2 += k * v * (freq2.get(k) || 0)
    }
    return [part1, part2];
}