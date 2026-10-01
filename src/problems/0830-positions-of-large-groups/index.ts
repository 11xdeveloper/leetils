/**
 * 830. Positions of Large Groups
 *
 * Returns `[start, end]` for every group of three or more equal consecutive
 * letters in `s`, in order.
 *
 * Scans the runs of equal letters.
 *
 * @see https://leetcode.com/problems/positions-of-large-groups/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * positionsOfLargeGroups("abbxxxxzzy"); // [[3, 6]]
 */
export const positionsOfLargeGroups = (s: string): number[][] => {
	const groups: number[][] = [];
	for (let start = 0, end = 0; start < s.length; start = end) {
		while (end < s.length && s.charAt(end) === s.charAt(start)) end++;
		if (end - start >= 3) groups.push([start, end - 1]);
	}
	return groups;
};
