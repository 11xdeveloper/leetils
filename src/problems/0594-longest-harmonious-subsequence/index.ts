/**
 * 594. Longest Harmonious Subsequence
 *
 * A harmonious array's largest and smallest values differ by exactly 1.
 * Returns the length of the longest harmonious subsequence of `nums`, or 0
 * if there's none.
 *
 * Such a subsequence takes every copy of some value `v` and of `v + 1`, so
 * it counts each value and checks each neighbouring pair.
 *
 * @see https://leetcode.com/problems/longest-harmonious-subsequence/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestHarmoniousSubsequence([1, 3, 2, 2, 5, 2, 3, 7]); // 5: [3, 2, 2, 2, 3]
 */
export const longestHarmoniousSubsequence = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

	let longest = 0;
	for (const [value, count] of counts) {
		const above = counts.get(value + 1);
		if (above !== undefined) longest = Math.max(longest, count + above);
	}
	return longest;
};
