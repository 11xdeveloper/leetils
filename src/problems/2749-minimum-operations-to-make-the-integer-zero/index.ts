/**
 * 2749. Minimum Operations to Make the Integer Zero
 *
 * Each operation subtracts `2^i + num2` from `num1`, for any `i` in
 * [0, 60]. Returns the fewest operations to reach exactly 0, or -1.
 *
 * After `k` operations the powers of two must sum to `num1 - k · num2`;
 * that works when it has at most `k` set bits and is at least `k`. Try
 * `k` upwards.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero/
 * @difficulty Medium
 * @timeComplexity O(60²)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToMakeTheIntegerZero(3, -2); // 3
 */
export const minimumOperationsToMakeTheIntegerZero = (
	num1: number,
	num2: number,
): number => {
	for (let k = 1; k <= 60; k++) {
		const target = num1 - k * num2;
		if (target < k) continue;
		const bits = target.toString(2).replaceAll("0", "").length;
		if (bits <= k) return k;
	}
	return -1;
};
