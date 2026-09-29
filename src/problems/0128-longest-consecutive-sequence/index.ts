/**
 * 128. Longest Consecutive Sequence
 *
 * Returns the length of the longest run of consecutive integers (like 1, 2,
 * 3, 4) whose values all appear in the unsorted array `nums`.
 *
 * Puts the values in a set, then counts upwards only from values that start
 * a run (whose predecessor is missing), so each value is counted once.
 *
 * @see https://leetcode.com/problems/longest-consecutive-sequence/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestConsecutiveSequence([100, 4, 200, 1, 3, 2]); // 4, for 1, 2, 3, 4
 */
export const longestConsecutiveSequence = (nums: readonly number[]): number => {
	const values = new Set(nums);
	let longest = 0;

	for (const value of values) {
		if (values.has(value - 1)) continue;
		let length = 1;
		while (values.has(value + length)) length++;
		longest = Math.max(longest, length);
	}

	return longest;
};
