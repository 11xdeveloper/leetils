/**
 * 3397. Maximum Number of Distinct Elements After Operations
 *
 * Add a number from [-k, k] to each element of `nums` at most once.
 * Returns the most distinct values possible.
 *
 * Sort, and give each element the smallest value in its range above the
 * last one used, which leaves the most room for the rest.
 *
 * @see https://leetcode.com/problems/maximum-number-of-distinct-elements-after-operations/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfDistinctElementsAfterOperations([1, 2, 2, 3, 3, 4], 2); // 6
 */
export const maximumNumberOfDistinctElementsAfterOperations = (
	nums: readonly number[],
	k: number,
): number => {
	let distinct = 0;
	let last = Number.NEGATIVE_INFINITY;
	for (const num of nums.toSorted((a, b) => a - b)) {
		const value = Math.max(last + 1, num - k);
		if (value > num + k) continue;
		distinct++;
		last = value;
	}
	return distinct;
};
