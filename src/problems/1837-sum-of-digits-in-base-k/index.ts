/**
 * 1837. Sum of Digits in Base K
 *
 * Returns the sum of the digits of `n` written in base `k`, read as base
 * 10 numbers.
 *
 * Repeated division by `k`.
 *
 * @see https://leetcode.com/problems/sum-of-digits-in-base-k/
 * @difficulty Easy
 * @timeComplexity O(log_k n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfDigitsInBaseK(34, 6); // 9
 */
export const sumOfDigitsInBaseK = (n: number, k: number): number => {
	let sum = 0;
	for (let rest = n; rest > 0; rest = Math.floor(rest / k)) sum += rest % k;
	return sum;
};
