/**
 * 1137. N-th Tribonacci Number
 *
 * Returns `T(n)`, where `T(0) = 0`, `T(1) = T(2) = 1` and each later term is
 * the sum of the three before it.
 *
 * Iterates, keeping the last three terms.
 *
 * @see https://leetcode.com/problems/n-th-tribonacci-number/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * nThTribonacciNumber(25); // 1389537
 */
export const nThTribonacciNumber = (n: number): number => {
	let [a, b, c] = [0, 1, 1];
	for (let i = 0; i < n; i++) [a, b, c] = [b, c, a + b + c];
	return a;
};
