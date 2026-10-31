/**
 * 2860. Happy Students
 *
 * A selected student is happy if more than `nums[i]` students are
 * selected; an unselected one if fewer are. Returns how many group sizes
 * make everyone happy.
 *
 * Choosing `g` students forces the `g` with the smallest values in. Sort,
 * and check the selected ones are all below `g` and the rest all above.
 *
 * @see https://leetcode.com/problems/happy-students/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * happyStudents([6, 0, 3, 3, 6, 7, 2, 7]); // 3
 */
export const happyStudents = (nums: readonly number[]): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	const n = sorted.length;
	let ways = 0;
	for (let g = 0; g <= n; g++)
		if (
			(g === 0 || (sorted[g - 1] ?? 0) < g) &&
			(g === n || (sorted[g] ?? 0) > g)
		)
			ways++;
	return ways;
};
