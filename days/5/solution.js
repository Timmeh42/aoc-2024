module.exports = function (input) {
    const [rawRules, rawUpdates] = input.trim().split('\n\n')

    const rules = rawRules.split('\n').map(line => line.split('|'))

    const updates = rawUpdates.split('\n').map(line => line.split(','))

    const correctUpdates = updates.filter(update => rules.every(rule => (update.indexOf(rule[0]) < update.indexOf(rule[1])) || update.indexOf(rule[1]) === -1))
    const part1 = correctUpdates.reduce((sum, update) => sum + Number(update[(update.length - 1) / 2]), 0)

    const incorrectUpdates = updates.filter(update => (rules.every(rule => (update.indexOf(rule[0]) < update.indexOf(rule[1])) || update.indexOf(rule[1]) === -1)) === false)
    const sortedUpdates = incorrectUpdates.map(update => [...update].sort((a, b) => {
        if (rules.some(rule => rule[0] === a && rule[1] === b)) {
            return -1
        }
        if (rules.some(rule => rule[0] === b && rule[1] === a)) {
            return 1
        }
        return 0
    }))
    const part2 = sortedUpdates.reduce((sum, update) => sum + Number(update[(update.length - 1) / 2]), 0)

    return [part1, part2]
}
