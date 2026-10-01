/**
 * 1637. Widest Vertical Area Between Two Points Containing No Points
 *
 * Returns the widest gap between the x-coordinates of `points` with no
 * point strictly inside it.
 *
 * The largest difference between consecutive sorted x-coordinates.
 *
 * @see https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * widestVerticalAreaBetweenTwoPointsContainingNoPoints([[8, 7], [9, 9], [7, 4], [9, 7]]); // 1
 */
export const widestVerticalAreaBetweenTwoPointsContainingNoPoints = (
	points: readonly (readonly number[])[],
): number => {
	const xs = points.map(([x = 0]) => x).sort((a, b) => a - b);
	let widest = 0;
	for (let i = 1; i < xs.length; i++)
		widest = Math.max(widest, (xs[i] ?? 0) - (xs[i - 1] ?? 0));
	return widest;
};
