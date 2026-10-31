/**
 * 3640. Trionic Array II
 *
 * Returns the largest sum of a subarray that strictly increases, then
 * strictly decreases, then strictly increases, each part taking at least
 * one step.
 *
 * Dynamic programming over subarrays ending at each index, by how many of
 * the three parts they've reached: the best rising run of two or more,
 * the best rise-then-fall, and the best complete shape.
 *
 * @see https://leetcode.com/problems/trionic-array-ii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * trionicArrayII([1, 4, 2, 7]); // 14
 */
export const trionicArrayII = (nums: readonly number[]): number => {
	const NONE = Number.NEGATIVE_INFINITY;
	let [rise, fall, full] = [NONE, NONE, NONE];
	let best = NONE;
	for (let i = 1; i < nums.length; i++) {
		const [before, here] = [nums[i - 1] ?? 0, nums[i] ?? 0];
		if (before < here) {
			full = Math.max(full, fall) + here;
			rise = Math.max(rise, before) + here;
			fall = NONE;
		} else if (before > here) {
			fall = Math.max(fall, rise) + here;
			[rise, full] = [NONE, NONE];
		} else [rise, fall, full] = [NONE, NONE, NONE];
		best = Math.max(best, full);
	}
	return best;
};
