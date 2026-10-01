/**
 * 1266. Minimum Time Visiting All Points
 *
 * Moving one unit horizontally, vertically or diagonally takes a second.
 * Returns the time to visit `points` in order.
 *
 * Diagonal steps cover both axes at once, so each leg takes the larger of
 * its horizontal and vertical distances.
 *
 * @see https://leetcode.com/problems/minimum-time-visiting-all-points/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumTimeVisitingAllPoints([[1, 1], [3, 4], [-1, 0]]); // 7
 */
export const minimumTimeVisitingAllPoints = (
	points: readonly (readonly number[])[],
): number => {
	let time = 0;
	for (let i = 1; i < points.length; i++) {
		const [x1 = 0, y1 = 0] = points[i - 1] ?? [];
		const [x2 = 0, y2 = 0] = points[i] ?? [];
		time += Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
	}
	return time;
};
