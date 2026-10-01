/**
 * 70. Climbing Stairs
 *
 * Returns how many distinct ways there are to climb `n` stairs, taking 1 or 2
 * steps at a time.
 *
 * The last move onto stair `n` is from `n - 1` or `n - 2`, so the counts
 * follow the Fibonacci sequence. Keeps just the last two.
 *
 * @see https://leetcode.com/problems/climbing-stairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * climbingStairs(3); // 3: 1+1+1, 1+2 and 2+1
 */
export const climbingStairs = (n: number): number => {
	let previous = 1;
	let current = 1;

	for (let i = 2; i <= n; i++) {
		[previous, current] = [current, previous + current];
	}

	return current;
};
