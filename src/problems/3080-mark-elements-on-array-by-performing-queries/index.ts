/**
 * 3080. Mark Elements on Array by Performing Queries
 *
 * Each query `[index, k]` marks `nums[index]` if it isn't already, then
 * marks the `k` smallest unmarked elements (the lower index first on a
 * tie). Returns the sum of the unmarked elements after each query.
 *
 * Sort the indices by value then index, and keep a pointer into that order
 * that skips anything already marked.
 *
 * @see https://leetcode.com/problems/mark-elements-on-array-by-performing-queries/
 * @difficulty Medium
 * @timeComplexity O(n log n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * markElementsOnArrayByPerformingQueries([1, 2, 2, 1, 2, 3, 1], [[1, 2], [3, 3], [4, 2]]); // [8, 3, 0]
 */
export const markElementsOnArrayByPerformingQueries = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const order = nums
		.map((_, i) => i)
		.sort((a, b) => (nums[a] ?? 0) - (nums[b] ?? 0) || a - b);
	const marked = new Uint8Array(nums.length);
	let unmarked = nums.reduce((a, b) => a + b, 0);
	const mark = (i: number): void => {
		if (marked[i]) return;
		marked[i] = 1;
		unmarked -= nums[i] ?? 0;
	};
	let next = 0;
	return queries.map(([index = 0, k = 0]) => {
		mark(index);
		for (let left = k; left > 0 && next < order.length; next++) {
			const i = order[next] ?? 0;
			if (marked[i]) continue;
			mark(i);
			left--;
		}
		return unmarked;
	});
};
