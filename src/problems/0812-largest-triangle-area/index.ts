/**
 * 812. Largest Triangle Area
 *
 * Returns the largest area of a triangle with three of the given points as
 * corners.
 *
 * Tries every triple, computing the area with the shoelace formula.
 *
 * @see https://leetcode.com/problems/largest-triangle-area/
 * @difficulty Easy
 * @timeComplexity O(n^3)
 * @spaceComplexity O(1)
 *
 * @example
 * largestTriangleArea([[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]]); // 2
 */
export const largestTriangleArea = (
	points: readonly (readonly number[])[],
): number => {
	let largest = 0;
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			for (let k = j + 1; k < points.length; k++) {
				const [x1 = 0, y1 = 0] = points[i] ?? [];
				const [x2 = 0, y2 = 0] = points[j] ?? [];
				const [x3 = 0, y3 = 0] = points[k] ?? [];
				largest = Math.max(
					largest,
					Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2,
				);
			}
		}
	}
	return largest;
};
