/**
 * 1232. Check If It Is a Straight Line
 *
 * Returns whether the distinct points in `coordinates` all lie on one
 * straight line.
 *
 * Every point must be collinear with the first two: the cross product of
 * their offsets from the first point is 0. This avoids dividing by zero for
 * vertical lines.
 *
 * @see https://leetcode.com/problems/check-if-it-is-a-straight-line/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfItIsAStraightLine([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]); // true
 */
export const checkIfItIsAStraightLine = (
	coordinates: readonly (readonly number[])[],
): boolean => {
	const [x0 = 0, y0 = 0] = coordinates[0] ?? [];
	const [x1 = 0, y1 = 0] = coordinates[1] ?? [];
	return coordinates.every(
		([x = 0, y = 0]) => (x1 - x0) * (y - y0) === (y1 - y0) * (x - x0),
	);
};
