/**
 * 1636. Sort Array by Increasing Frequency
 *
 * Sorts `nums` by how often each value appears, rarest first, with larger
 * values first among equally frequent ones.
 *
 * Counts the values, then sorts by that key.
 *
 * @see https://leetcode.com/problems/sort-array-by-increasing-frequency/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortArrayByIncreasingFrequency([2, 3, 1, 3, 2]); // [1, 3, 3, 2, 2]
 */
export const sortArrayByIncreasingFrequency = (
	nums: readonly number[],
): number[] => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	return nums.toSorted(
		(a, b) => (counts.get(a) ?? 0) - (counts.get(b) ?? 0) || b - a,
	);
};
