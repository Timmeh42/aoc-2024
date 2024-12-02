module.exports = function (input) {
    const reports = input.trim().split(/\r?\n/g).map(line => line.split(' ').map(Number))
    let part1 = 0
    let part2 = 0
    for (const report of reports) {
        let prev = 0
        let dir = 0
        let pass1 = 1
        for (const reading of report) {
            if (prev !== 0) {
                let currentDir = Math.sign(prev - reading)
                if (
                    (dir !== 0 && currentDir !== dir) ||
                    (Math.abs(prev - reading) < 1 || Math.abs(prev - reading) > 3)
                ) {
                    pass1 = 0
                }
                dir = currentDir
            }
            prev = reading
        }
        part1 += pass1

        let pass2 = 1
        for (let n = 0; n < report.length; n++) {
            prev = 0
            dir = 0
            pass2 = 1
            const pseudoReport = [...report]
            pseudoReport.splice(n, 1)
            for (const reading of pseudoReport) {
                if (prev !== 0) {
                    let currentDir = Math.sign(prev - reading)
                    if (
                        (dir !== 0 && currentDir !== dir) ||
                        (Math.abs(prev - reading) < 1 || Math.abs(prev - reading) > 3)
                    ) {
                        pass2 = 0
                    }
                    dir = currentDir
                }
                prev = reading
            }
            if (pass2 === 1) {
                break
            }
        }
        part2 += pass1 || pass2
    }
    return [part1, part2];
}
