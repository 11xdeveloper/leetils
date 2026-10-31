/**
 * 2997. Minimum Number of Operations to Make Array XOR Equal to K
 *
 * Each operation flips one bit of one element. Returns the fewest
 * operations to make the XOR of `nums` equal `k`.
 *
 * Every flip toggles one bit of the XOR, so count the bits where the
 * current XOR and `k` differ.
 *
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-make-array-xor-equal-to-k/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfOperationsToMakeArrayXorEqualToK([2, 1, 3, 4], 1); // 2
 */
export const minimumNumberOfOperationsToMakeArrayXorEqualToK = (
	nums: readonly number[],
	k: number,
): number => {
	let difference = nums.reduce((xor, num) => xor ^ num, k);
	let flips = 0;
	for (; difference; difference &= difference - 1) flips++;
	return flips;
};
