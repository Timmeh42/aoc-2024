module.exports = function (input) {
    const width = input.indexOf('\n')
    const antennae = new Map()
    const loci = new Set()
    const loci2 = new Set()
    for (const match of input.matchAll(/[a-zA-Z0-9]/g)) {
        const type = match[0]
        const index = match.index
        const x = index % (width + 1)
        const y = Math.floor(index / (width + 1))
        if (antennae.has(type)) {
            antennae.get(type).push([x, y])
        } else {
            antennae.set(type, [[x, y]])
        }
    }
    for (const [type, coords] of antennae) {
        for (let a1 = 0; a1 < coords.length; a1 ++) {
            for (let a2 = a1 + 1; a2 < coords.length; a2++) {
                const locus1 = [
                    coords[a1][0] + coords[a1][0] - coords[a2][0],
                    coords[a1][1] + coords[a1][1] - coords[a2][1],
                ]
                if (locus1[0] >= 0 && locus1[0] < width && locus1[1] >= 0 && locus1[1] < width) {
                    loci.add(locus1[0] + locus1[1] * width)
                }
                const locus2 = [
                    coords[a2][0] + coords[a2][0] - coords[a1][0],
                    coords[a2][1] + coords[a2][1] - coords[a1][1],
                ]
                if (locus2[0] >= 0 && locus2[0] < width && locus2[1] >= 0 && locus2[1] < width) {
                    loci.add(locus2[0] + locus2[1] * width)
                }
                for (let n = -width; n < width; n++) {
                    const locus = [
                        coords[a1][0] + (coords[a1][0] - coords[a2][0]) * n,
                        coords[a1][1] + (coords[a1][1] - coords[a2][1]) * n,
                    ]
                    if (locus[0] >= 0 && locus[0] < width && locus[1] >= 0 && locus[1] < width) {
                        loci2.add(locus[0] + locus[1] * width)
                    }
                }
            }
        }
    }
    const part1 = loci.size
    const part2 = loci2.size
    return [part1, part2]
}
