/**
 * 1691. Maximum Height by Stacking Cuboids
 *
 * Cuboids may be rotated and stacked when each dimension of the upper one
 * is at most the lower one's. Returns the tallest stack of some of them.
 *
 * Sorting each cuboid's dimensions and using the largest as height is
 * always best, and makes "fits on" a comparison of sorted triples. With
 * the cuboids sorted too, a longest-chain dynamic program finishes it.
 *
 * @see https://leetcode.com/problems/maximum-height-by-stacking-cuboids/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumHeightByStackingCuboids([[50, 45, 20], [95, 37, 53], [45, 23, 12]]); // 190
 */
export const maximumHeightByStackingCuboids = (
	cuboids: readonly (readonly number[])[],
): number => {
	const sorted = cuboids
		.map((cuboid) => cuboid.toSorted((a, b) => a - b))
		.sort(
			([a0 = 0, a1 = 0, a2 = 0], [b0 = 0, b1 = 0, b2 = 0]) =>
				a0 - b0 || a1 - b1 || a2 - b2,
		);
	const tallest: number[] = [];
	for (const [i, [w = 0, l = 0, h = 0]] of sorted.entries()) {
		let best = h;
		for (let j = 0; j < i; j++) {
			const [w2 = 0, l2 = 0, h2 = 0] = sorted[j] ?? [];
			if (w2 <= w && l2 <= l && h2 <= h)
				best = Math.max(best, (tallest[j] ?? 0) + h);
		}
		tallest.push(best);
	}
	return Math.max(...tallest);
};
