/**
 * 452. Minimum Number of Arrows to Burst Balloons
 *
 * Each balloon spans `[start, end]` on the x-axis, and an arrow shot at `x`
 * bursts every balloon with `start ≤ x ≤ end`. Returns the fewest arrows
 * that burst them all.
 *
 * Greedy: sorted by end, the balloon ending first needs an arrow, and
 * shooting it at that end bursts as many others as possible. Each balloon
 * starting after the last arrow needs a new one at its own end.
 *
 * @see https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * minimumNumberOfArrowsToBurstBalloons([[10, 16], [2, 8], [1, 6], [7, 12]]); // 2
 */
export const minimumNumberOfArrowsToBurstBalloons = (
	points: readonly (readonly number[])[],
): number => {
	const byEnd = points.toSorted((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	let arrows = 0;
	let arrow = Number.NEGATIVE_INFINITY;

	for (const [start = 0, end = 0] of byEnd) {
		if (start > arrow) {
			arrows++;
			arrow = end;
		}
	}

	return arrows;
};
