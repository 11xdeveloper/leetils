/**
 * 1460. Make Two Arrays Equal by Reversing Subarrays
 *
 * Returns whether reversing subarrays of `arr` any number of times can make
 * it equal to `target`.
 *
 * Reversing length-2 subarrays swaps neighbours, which can sort any
 * arrangement, so it only matters that both hold the same values.
 *
 * @see https://leetcode.com/problems/make-two-arrays-equal-by-reversing-subarrays/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeTwoArraysEqualByReversingSubarrays([1, 2, 3, 4], [2, 4, 1, 3]); // true
 */
export const makeTwoArraysEqualByReversingSubarrays = (
	target: readonly number[],
	arr: readonly number[],
): boolean => {
	const balance = new Map<number, number>();
	for (const value of target) balance.set(value, (balance.get(value) ?? 0) + 1);
	for (const value of arr) balance.set(value, (balance.get(value) ?? 0) - 1);
	return [...balance.values()].every((count) => count === 0);
};
