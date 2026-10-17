/**
 * 2044. Count Number of Maximum Bitwise-OR Subsets
 *
 * Counts the non-empty subsets of `nums` whose bitwise OR is the largest
 * possible, which is the OR of everything.
 *
 * Count subsets by their OR, adding one number at a time.
 *
 * @see https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/
 * @difficulty Medium
 * @timeComplexity O(n · V) for V distinct OR values
 * @spaceComplexity O(V)
 *
 * @example
 * countNumberOfMaximumBitwiseOrSubsets([3, 2, 1, 5]); // 6
 */
export const countNumberOfMaximumBitwiseOrSubsets = (
	nums: readonly number[],
): number => {
	let byOr = new Map<number, number>([[0, 1]]);
	for (const num of nums) {
		const next = new Map(byOr);
		for (const [or, count] of byOr)
			next.set(or | num, (next.get(or | num) ?? 0) + count);
		byOr = next;
	}
	return byOr.get(nums.reduce((or, num) => or | num, 0)) ?? 0;
};
