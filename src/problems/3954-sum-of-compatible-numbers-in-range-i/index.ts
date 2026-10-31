/**
 * 3954. Sum of Compatible Numbers in Range I
 *
 * Adds the positive integers x within `k` of `n` that share no set bits
 * with n.
 *
 * @see https://leetcode.com/problems/sum-of-compatible-numbers-in-range-i/
 * @difficulty Easy
 * @timeComplexity O(k)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfCompatibleNumbersInRangeI(2, 3); // 10
 */
export const sumOfCompatibleNumbersInRangeI = (
	n: number,
	k: number,
): number => {
	let sum = 0;
	for (let x = Math.max(1, n - k); x <= n + k; x++) if ((n & x) === 0) sum += x;
	return sum;
};
