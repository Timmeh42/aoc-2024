module.exports = function (input) {
    const column1 = input.trim().match(/^\d+/gm).map(Number).toSorted()
    const column2 = input.trim().match(/\d+$/gm).map(Number).toSorted()
    let part1 = 0
    let part2 = 0
    for (let row = 0; row < column1.length; row++) {
        part1 += Math.abs(column1[row] - column2[row])

        part2 += column1[row] * column2.filter(val => val === column1[row]).length
    }
    return [part1, part2];
}