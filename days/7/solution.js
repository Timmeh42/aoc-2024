module.exports = function (input) {
    const lines = input.trim().split('\n').map(line => line.split(/:?\s/g).map(Number))

    let part1 = 0
    for (const line of lines) {
        const results = [line[1]]
        for (let n = 2; n < line.length; n++) {
            const rlength = results.length
            for (let r = 0; r < rlength; r++) {
                results.push(results[r] * line[n])
                results[r] = results[r] + line[n]
            }
        }

        if (results.includes(line[0])) {
            part1 += line[0]
        }
    }

    let part2 = 0
    for (const line of lines) {
        const results = [line[1]]
        for (let n = 2; n < line.length; n++) {
            const rlength = results.length
            for (let r = 0; r < rlength; r++) {
                results.push((results[r] * 10 ** (1 + Math.floor(Math.log10(line[n])))) + line[n])
                results.push(results[r] * line[n])
                results[r] = results[r] + line[n]
            }
        }

        if (results.includes(line[0])) {
            part2 += line[0]
        }
    }

    return [part1, part2]
}
