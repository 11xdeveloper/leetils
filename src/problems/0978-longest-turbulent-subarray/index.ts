/**
 * 978. Longest Turbulent Subarray
 *
 * Returns the length of the longest subarray whose comparisons between
 * neighbours strictly alternate (`<`, `>`, `<`, … or starting with `>`).
 *
 * Tracks the current turbulent run: it grows while the comparison flips,
 * restarts at 2 on a comparison that doesn't flip, and at 1 on equality.
 *
 * @see https://leetcode.com/problems/longest-turbulent-subarray/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestTurbulentSubarray([9, 4, 2, 10, 7, 8, 8, 1, 9]); // 5
 */
export const longestTurbulentSubarray = (arr: readonly number[]): number => {
	let longest = 1;
	let run = 1;
	let previous = 0;
	for (let i = 1; i < arr.length; i++) {
		const comparison = Math.sign((arr[i] ?? 0) - (arr[i - 1] ?? 0));
		if (comparison === 0) run = 1;
		else if (comparison === -previous) run++;
		else run = 2;
		previous = comparison;
		longest = Math.max(longest, run);
	}
	return longest;
};
