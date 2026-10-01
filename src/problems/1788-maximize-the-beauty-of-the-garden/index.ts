/**
 * 1788. Maximize the Beauty of the Garden
 *
 * Removing any flowers, the remaining garden needs at least two flowers
 * with equal first and last beauty. Returns the largest possible total
 * beauty.
 *
 * For a pair of equal ends, keep both plus every positive flower between
 * them. With prefix sums of positive values, each value's best left end is
 * its first occurrence, so one pass suffices.
 *
 * @see https://leetcode.com/problems/maximize-the-beauty-of-the-garden/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeTheBeautyOfTheGarden([100, 1, 1, -3, 1]); // 3
 */
export const maximizeTheBeautyOfTheGarden = (
	flowers: readonly number[],
): number => {
	// first[v]: the positive-prefix sum just after v's first occurrence.
	const first = new Map<number, number>();
	let positive = 0;
	let best = -Infinity;
	for (const flower of flowers) {
		const start = first.get(flower);
		if (start !== undefined)
			best = Math.max(best, 2 * flower + positive - start);
		positive += Math.max(flower, 0);
		if (start === undefined) first.set(flower, positive);
	}
	return best;
};
