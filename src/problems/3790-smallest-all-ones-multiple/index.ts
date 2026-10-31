/**
 * 3790. Smallest All-Ones Multiple
 *
 * The length of the smallest number made only of 1s that `k` divides, or
 * -1.
 *
 * Track 11…1 mod k; if it hasn't hit 0 within k lengths, it's cycling.
 *
 * @see https://leetcode.com/problems/smallest-all-ones-multiple/
 * @difficulty Medium
 * @timeComplexity O(k)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestAllOnesMultiple(7); // 6
 */
export const smallestAllOnesMultiple = (k: number): number => {
	let remainder = 0;
	for (let length = 1; length <= k; length++) {
		remainder = (remainder * 10 + 1) % k;
		if (remainder === 0) return length;
	}
	return -1;
};
