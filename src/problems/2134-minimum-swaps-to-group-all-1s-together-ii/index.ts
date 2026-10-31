/**
 * 2134. Minimum Swaps to Group All 1's Together II
 *
 * Returns the fewest swaps to gather all the 1s of the circular binary
 * array `nums` together.
 *
 * Slide a window as wide as the number of 1s around the circle; the
 * answer is the fewest 0s it ever holds.
 *
 * @see https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumSwapsToGroupAll1sTogetherII([0, 1, 0, 1, 1, 0, 0]); // 1
 */
export const minimumSwapsToGroupAll1sTogetherII = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const ones = nums.filter((num) => num === 1).length;
	let inWindow = nums.slice(0, ones).filter((num) => num === 1).length;
	let best = ones - inWindow;
	for (let start = 1; start < n; start++) {
		inWindow += (nums[(start + ones - 1) % n] ?? 0) - (nums[start - 1] ?? 0);
		best = Math.min(best, ones - inWindow);
	}
	return best;
};
