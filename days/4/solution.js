module.exports = function (input) {
    const map = input.trim()
    const width = map.indexOf('\n')
    const regexs1 = [
        'XMAS',
        `X(?=[\\s\\S]{${width + 1}}M[\\s\\S]{${width + 1}}A[\\s\\S]{${width + 1}}S)`,
        `X(?=[\\s\\S]{${width}}M[\\s\\S]{${width}}A[\\s\\S]{${width}}S)`,
        `X(?=[\\s\\S]{${width - 1}}M[\\s\\S]{${width - 1}}A[\\s\\S]{${width - 1}}S)`,
        'SAMX',
        `S(?=[\\s\\S]{${width + 1}}A[\\s\\S]{${width + 1}}M[\\s\\S]{${width + 1}}X)`,
        `S(?=[\\s\\S]{${width}}A[\\s\\S]{${width}}M[\\s\\S]{${width}}X)`,
        `S(?=[\\s\\S]{${width - 1}}A[\\s\\S]{${width - 1}}M[\\s\\S]{${width - 1}}X)`,
    ]
    let part1 = 0
    for (const regexString of regexs1) {
        const regex = new RegExp(regexString, 'g')
        const result = map.match(regex)
        part1 += result.length
    }

    const regexs2 = [
        `M(?=.M[\\s\\S]{${width - 1}}A[\\s\\S]{${width - 1}}S.S)`,
        `M(?=.S[\\s\\S]{${width - 1}}A[\\s\\S]{${width - 1}}M.S)`,
        `S(?=.S[\\s\\S]{${width - 1}}A[\\s\\S]{${width - 1}}M.M)`,
        `S(?=.M[\\s\\S]{${width - 1}}A[\\s\\S]{${width - 1}}S.M)`,
    ]
    let part2 = 0
    for (const regexString of regexs2) {
        const regex = new RegExp(regexString, 'g')
        const result = map.match(regex)
        part2 += result.length
    }

    return [part1, part2]
}
