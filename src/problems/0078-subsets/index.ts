/**
 * 78. Subsets
 *
 * Returns every subset of `nums`, which holds distinct values, including the
 * empty set.
 *
 * Starts from the empty set and, for each number, adds a copy of every
 * subset so far with that number appended.
 *
 * @see https://leetcode.com/problems/subsets/
 * @difficulty Medium
 * @timeComplexity O(n * 2^n)
 * @spaceComplexity O(n * 2^n) for the returned subsets
 *
 * @example
 * subsets([1, 2, 3]); // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
 */
export const subsets = (nums: readonly number[]): number[][] => {
	let results: number[][] = [[]];

	for (const num of nums) {
		results = [...results, ...results.map((subset) => [...subset, num])];
	}

	return results;
};
