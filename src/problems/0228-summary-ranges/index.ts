/**
 * 228. Summary Ranges
 *
 * Summarises a sorted array of distinct integers as the smallest list of
 * ranges covering exactly its values: `"a->b"` for a run from `a` to `b`, or
 * `"a"` for a single value.
 *
 * Extends each run while the next value is one more than the last.
 *
 * @see https://leetcode.com/problems/summary-ranges/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned ranges
 *
 * @example
 * summaryRanges([0, 1, 2, 4, 5, 7]); // ["0->2", "4->5", "7"]
 */
export const summaryRanges = (nums: readonly number[]): string[] => {
	const ranges: string[] = [];

	for (let start = 0; start < nums.length; ) {
		let end = start;
		while (end + 1 < nums.length && nums[end + 1] === (nums[end] ?? 0) + 1)
			end++;
		ranges.push(
			end === start ? `${nums[start]}` : `${nums[start]}->${nums[end]}`,
		);
		start = end + 1;
	}

	return ranges;
};
