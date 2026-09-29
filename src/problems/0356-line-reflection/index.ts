/**
 * 356. Line Reflection
 *
 * Returns whether some vertical line reflects the set of points onto itself.
 * Points may repeat.
 *
 * If such a line exists, it must lie halfway between the leftmost and
 * rightmost points, so every point `(x, y)` needs a partner at
 * `(minX + maxX - x, y)`. A set of the points checks each partner in
 * constant time, which beats comparing every pair.
 *
 * @see https://leetcode.com/problems/line-reflection/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * lineReflection([[1, 1], [-1, 1]]); // true, reflected in x = 0
 */
export const lineReflection = (
	points: readonly (readonly number[])[],
): boolean => {
	const xs = points.map(([x = 0]) => x);
	const mirrorSum = Math.min(...xs) + Math.max(...xs);
	const present = new Set(points.map(([x = 0, y = 0]) => `${x},${y}`));

	return points.every(([x = 0, y = 0]) => present.has(`${mirrorSum - x},${y}`));
};
