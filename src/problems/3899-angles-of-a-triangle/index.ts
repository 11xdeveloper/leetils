/**
 * 3899. Angles of a Triangle
 *
 * If `sides` form a triangle with positive area, returns its angles in
 * degrees, smallest first; otherwise `[]`.
 *
 * The law of cosines gives each angle from the sides.
 *
 * @see https://leetcode.com/problems/angles-of-a-triangle/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * anglesOfATriangle([3, 4, 5]); // [36.8699, 53.1301, 90]
 */
export const anglesOfATriangle = (sides: readonly number[]): number[] => {
	const [a = 0, b = 0, c = 0] = [...sides].sort((x, y) => x - y);
	if (a + b <= c) return [];
	const angle = (opposite: number, x: number, y: number) =>
		(Math.acos((x * x + y * y - opposite * opposite) / (2 * x * y)) * 180) /
		Math.PI;
	return [angle(a, b, c), angle(b, a, c), angle(c, a, b)];
};
