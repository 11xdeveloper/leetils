/**
 * 2113. Elements in Array After Removing and Replacing Elements
 *
 * Each minute the array loses its first element until it is empty, then
 * regains them one per minute in order until whole, and repeats. For each
 * query `[time, index]`, returns the element at `index` at minute `time`,
 * or -1 if there isn't one.
 *
 * The process repeats every `2n` minutes; within a cycle the array is a
 * suffix of `nums` for `n` minutes and then a growing prefix.
 *
 * @see https://leetcode.com/problems/elements-in-array-after-removing-and-replacing-elements/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(1) beyond the output
 *
 * @example
 * elementsInArrayAfterRemovingAndReplacingElements([0, 1, 2], [[0, 2], [2, 0], [3, 2], [5, 0]]); // [2, 2, -1, 0]
 */
export const elementsInArrayAfterRemovingAndReplacingElements = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const n = nums.length;
	return queries.map(([time = 0, index = 0]) => {
		const t = time % (2 * n);
		if (t < n) return index < n - t ? (nums[t + index] ?? -1) : -1;
		return index < t - n ? (nums[index] ?? -1) : -1;
	});
};
