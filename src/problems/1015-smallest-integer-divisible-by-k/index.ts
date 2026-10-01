/**
 * 1015. Smallest Integer Divisible by K
 *
 * Returns the length of the smallest number made only of 1s that is
 * divisible by `k`, or -1 if there's none.
 *
 * Tracks the remainder of 1, 11, 111, … modulo `k`. There are only `k`
 * remainders, so within `k` steps it either reaches 0 or starts repeating
 * (which happens exactly when `k` shares a factor with 10).
 *
 * @see https://leetcode.com/problems/smallest-integer-divisible-by-k/
 * @difficulty Medium
 * @timeComplexity O(k)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestIntegerDivisibleByK(3); // 3: 111
 */
export const smallestIntegerDivisibleByK = (k: number): number => {
	if (k % 2 === 0 || k % 5 === 0) return -1;
	let remainder = 0;
	for (let length = 1; length <= k; length++) {
		remainder = (remainder * 10 + 1) % k;
		if (remainder === 0) return length;
	}
	return -1;
};
