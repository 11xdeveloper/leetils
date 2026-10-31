/**
 * 2543. Check if Point Is Reachable
 *
 * Starting from `(1, 1)`, a step moves `(x, y)` to `(x, y - x)`,
 * `(x - y, y)`, `(2x, y)` or `(x, 2y)`. Returns whether `(targetX,
 * targetY)` can be reached.
 *
 * Subtraction keeps the gcd and doubling can only double it, so a point
 * is reachable exactly when the gcd of its coordinates is a power of two.
 *
 * @see https://leetcode.com/problems/check-if-point-is-reachable/
 * @difficulty Hard
 * @timeComplexity O(log(min(targetX, targetY)))
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfPointIsReachable(4, 7); // true
 */
export const checkIfPointIsReachable = (
	targetX: number,
	targetY: number,
): boolean => {
	let a = targetX;
	let b = targetY;
	while (b) [a, b] = [b, a % b];
	return (a & (a - 1)) === 0;
};
