/**
 * 4031. Find All Numbers Disappeared in an Array II
 *
 * Lists the runs of integers from `lower` to `upper` missing from `nums`,
 * as `[start, end]` pairs in order.
 *
 * @see https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n + (upper - lower))
 * @spaceComplexity O(n)
 *
 * @example
 * findAllNumbersDisappearedInAnArrayII([3, 9, 7], 1, 12); // [[1, 2], [4, 6], [8, 8], [10, 12]]
 */
export const findAllNumbersDisappearedInAnArrayII = (
	nums: readonly number[],
	lower: number,
	upper: number,
): number[][] => {
	const present = new Set(nums);
	const runs: number[][] = [];
	for (let x = lower; x <= upper; x++) {
		if (present.has(x)) continue;
		const last = runs.at(-1);
		if (last && last[1] === x - 1) last[1] = x;
		else runs.push([x, x]);
	}
	return runs;
};
