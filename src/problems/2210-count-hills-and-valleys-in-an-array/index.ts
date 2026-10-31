/**
 * 2210. Count Hills and Valleys in an Array
 *
 * A hill (or valley) is a maximal run of equal values whose nearest
 * different neighbours on both sides are smaller (or larger). Counts them.
 *
 * Collapse runs of equal values, then count strict local extremes.
 *
 * @see https://leetcode.com/problems/count-hills-and-valleys-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countHillsAndValleysInAnArray([2, 4, 1, 1, 6, 5]); // 3
 */
export const countHillsAndValleysInAnArray = (
	nums: readonly number[],
): number => {
	const runs = nums.filter((num, i) => i === 0 || num !== nums[i - 1]);
	let count = 0;
	for (let i = 1; i < runs.length - 1; i++) {
		const [before, value, after] = [
			runs[i - 1] ?? 0,
			runs[i] ?? 0,
			runs[i + 1] ?? 0,
		];
		if (value > before === value > after) count++;
	}
	return count;
};
