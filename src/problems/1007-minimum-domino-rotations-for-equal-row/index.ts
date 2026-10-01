/**
 * 1007. Minimum Domino Rotations For Equal Row
 *
 * Each domino shows `tops[i]` on top and `bottoms[i]` below; a rotation
 * swaps them. Returns the fewest rotations making every top equal, or every
 * bottom equal, or -1 if neither is possible.
 *
 * The common value must appear on the first domino, so only
 * `tops[0]` and `bottoms[0]` are candidates. For each, it counts the
 * rotations needed to bring it to the top and to the bottom.
 *
 * @see https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDominoRotationsForEqualRow([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2]); // 2
 */
export const minimumDominoRotationsForEqualRow = (
	tops: readonly number[],
	bottoms: readonly number[],
): number => {
	let best = Number.POSITIVE_INFINITY;
	for (const target of [tops[0] ?? 0, bottoms[0] ?? 0]) {
		let toTop = 0;
		let toBottom = 0;
		let possible = true;
		for (const [i, top] of tops.entries()) {
			const bottom = bottoms[i] ?? 0;
			if (top !== target && bottom !== target) {
				possible = false;
				break;
			}
			if (top !== target) toTop++;
			if (bottom !== target) toBottom++;
		}
		if (possible) best = Math.min(best, toTop, toBottom);
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};
