/**
 * 509. Fibonacci Number
 *
 * Returns the `n`th Fibonacci number, where `F(0) = 0`, `F(1) = 1` and each
 * later one is the sum of the two before.
 *
 * Iterates, keeping only the last two numbers.
 *
 * @see https://leetcode.com/problems/fibonacci-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * fibonacciNumber(4); // 3
 */
export const fibonacciNumber = (n: number): number => {
	let current = 0;
	let next = 1;
	for (let i = 0; i < n; i++) [current, next] = [next, current + next];
	return current;
};
