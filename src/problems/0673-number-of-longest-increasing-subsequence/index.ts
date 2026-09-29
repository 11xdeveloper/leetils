/**
 * 673. Number of Longest Increasing Subsequence
 *
 * Counts the longest strictly increasing subsequences of `nums` (by the
 * indices they use).
 *
 * For each index, the length of the longest increasing subsequence ending
 * there and how many there are, built from every smaller earlier element.
 * The answer adds up the counts at the overall longest length.
 *
 * @see https://leetcode.com/problems/number-of-longest-increasing-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfLongestIncreasingSubsequence([1, 3, 5, 4, 7]); // 2: [1, 3, 4, 7] and [1, 3, 5, 7]
 */
export const numberOfLongestIncreasingSubsequence = (
	nums: readonly number[],
): number => {
	const lengths = nums.map(() => 1);
	const counts = nums.map(() => 1);

	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if ((nums[j] ?? 0) >= (nums[i] ?? 0)) continue;
			const length = (lengths[j] ?? 1) + 1;
			if (length > (lengths[i] ?? 1)) {
				lengths[i] = length;
				counts[i] = counts[j] ?? 1;
			} else if (length === lengths[i]) {
				counts[i] = (counts[i] ?? 0) + (counts[j] ?? 1);
			}
		}
	}

	const longest = Math.max(...lengths);
	return counts.reduce(
		(total, count, i) => (lengths[i] === longest ? total + count : total),
		0,
	);
};
