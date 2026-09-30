/**
 * 1035. Uncrossed Lines
 *
 * Lines connect equal numbers in `nums1` and `nums2` (written on two
 * parallel rows) without crossing or sharing endpoints. Returns the most
 * lines that can be drawn.
 *
 * Uncrossed lines join a common subsequence, so this is the longest common
 * subsequence, computed with one row of the DP table.
 *
 * @see https://leetcode.com/problems/uncrossed-lines/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * uncrossedLines([1, 4, 2], [1, 2, 4]); // 2
 */
export const uncrossedLines = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	let previous = new Array<number>(nums2.length + 1).fill(0);
	for (const a of nums1) {
		const current = [0];
		for (let j = 1; j <= nums2.length; j++) {
			current[j] =
				a === nums2[j - 1]
					? (previous[j - 1] ?? 0) + 1
					: Math.max(previous[j] ?? 0, current[j - 1] ?? 0);
		}
		previous = current;
	}
	return previous[nums2.length] ?? 0;
};
