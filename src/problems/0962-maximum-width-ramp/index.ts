/**
 * 962. Maximum Width Ramp
 *
 * A ramp is a pair `i < j` with `nums[i] ≤ nums[j]`, of width `j - i`.
 * Returns the widest ramp, or 0 if there's none.
 *
 * The best left end is always a new minimum from the left, so it stacks
 * those indices. Then, scanning right ends from the right, each pops every
 * left end it can reach, since no later (smaller) right end would do
 * better with them.
 *
 * @see https://leetcode.com/problems/maximum-width-ramp/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumWidthRamp([6, 0, 8, 2, 1, 5]); // 4
 */
export const maximumWidthRamp = (nums: readonly number[]): number => {
	const starts: number[] = [];
	for (const [i, num] of nums.entries())
		if (starts.length === 0 || num < (nums[starts.at(-1) ?? 0] ?? 0))
			starts.push(i);

	let widest = 0;
	for (let j = nums.length - 1; j >= 0 && starts.length > 0; j--) {
		while (
			starts.length > 0 &&
			(nums[starts.at(-1) ?? 0] ?? 0) <= (nums[j] ?? 0)
		)
			widest = Math.max(widest, j - (starts.pop() ?? j));
	}
	return widest;
};
