/**
 * 939. Minimum Area Rectangle
 *
 * Returns the smallest area of an axis-aligned rectangle with all four
 * corners among the distinct `points`, or 0 if there's none.
 *
 * Tries every pair of points as opposite corners and checks whether the
 * other two corners are points too.
 *
 * @see https://leetcode.com/problems/minimum-area-rectangle/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumAreaRectangle([[1, 1], [1, 3], [3, 1], [3, 3], [2, 2]]); // 4
 */
export const minimumAreaRectangle = (
	points: readonly (readonly number[])[],
): number => {
	const present = new Set(points.map(([x = 0, y = 0]) => `${x},${y}`));
	let smallest = Number.POSITIVE_INFINITY;
	for (let i = 0; i < points.length; i++) {
		const [x1 = 0, y1 = 0] = points[i] ?? [];
		for (let j = i + 1; j < points.length; j++) {
			const [x2 = 0, y2 = 0] = points[j] ?? [];
			if (x1 === x2 || y1 === y2) continue;
			if (present.has(`${x1},${y2}`) && present.has(`${x2},${y1}`))
				smallest = Math.min(smallest, Math.abs(x1 - x2) * Math.abs(y1 - y2));
		}
	}
	return smallest === Number.POSITIVE_INFINITY ? 0 : smallest;
};
