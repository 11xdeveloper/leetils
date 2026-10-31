/**
 * 3111. Minimum Rectangles to Cover Points
 *
 * The fewest rectangles, each standing on the x-axis with width at most
 * `w`, needed to cover all the points.
 *
 * Height is free, so only x matters. Sort the x values and start a new
 * rectangle at the first point it doesn't reach.
 *
 * @see https://leetcode.com/problems/minimum-rectangles-to-cover-points/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumRectanglesToCoverPoints([[2, 1], [1, 0], [1, 4], [1, 8], [3, 5], [4, 6]], 1); // 2
 */
export const minimumRectanglesToCoverPoints = (
	points: readonly (readonly number[])[],
	w: number,
): number => {
	let rectangles = 0;
	let reach = Number.NEGATIVE_INFINITY;
	for (const x of points.map((point) => point[0] ?? 0).sort((a, b) => a - b))
		if (x > reach) {
			rectangles++;
			reach = x + w;
		}
	return rectangles;
};
