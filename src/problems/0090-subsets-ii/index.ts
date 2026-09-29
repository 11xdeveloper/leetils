/**
 * 90. Subsets II
 *
 * Returns every distinct subset of `nums`, which may hold repeated values,
 * including the empty set. Each subset is in ascending order.
 *
 * Sorts the values, then builds subsets from the empty set: each new value
 * is appended to every subset so far. A repeated value is only appended to
 * the subsets created in the previous step, since appending it to the older
 * ones would recreate subsets that already exist.
 *
 * @see https://leetcode.com/problems/subsets-ii/
 * @difficulty Medium
 * @timeComplexity O(n * 2^n)
 * @spaceComplexity O(n * 2^n) for the returned subsets
 *
 * @example
 * subsetsII([1, 2, 2]); // [[], [1], [2], [1, 2], [2, 2], [1, 2, 2]]
 */
export const subsetsII = (nums: readonly number[]): number[][] => {
	const sorted = nums.toSorted((a, b) => a - b);
	const results: number[][] = [[]];
	let previousStart = 0;

	for (const [i, num] of sorted.entries()) {
		const start = i > 0 && num === sorted[i - 1] ? previousStart : 0;
		const end = results.length;
		for (let j = start; j < end; j++) {
			results.push([...(results[j] ?? []), num]);
		}
		previousStart = end;
	}

	return results;
};
