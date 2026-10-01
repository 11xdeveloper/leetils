const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * 365. Water and Jug Problem
 *
 * With two jugs holding `x` and `y` litres and unlimited water, returns
 * whether exactly `target` litres can end up in the jugs (in one or split
 * between both), by filling, emptying and pouring one into the other.
 *
 * By Bézout's identity, the amounts reachable are exactly the multiples of
 * `gcd(x, y)` that fit in both jugs together.
 *
 * @see https://leetcode.com/problems/water-and-jug-problem/
 * @difficulty Medium
 * @timeComplexity O(log min(x, y))
 * @spaceComplexity O(log min(x, y))
 *
 * @example
 * waterAndJugProblem(3, 5, 4); // true
 */
export const waterAndJugProblem = (
	x: number,
	y: number,
	target: number,
): boolean => target <= x + y && target % gcd(x, y) === 0;
