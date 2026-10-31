/**
 * 3152. Special Array II
 *
 * For each query `[from, to]`, whether every pair of neighbours in
 * `nums[from..to]` has one odd and one even number.
 *
 * Prefix-count the neighbouring pairs with equal parity; a range is special
 * if it contains none.
 *
 * @see https://leetcode.com/problems/special-array-ii/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * specialArrayII([4, 3, 1, 6], [[0, 2], [2, 3]]); // [false, true]
 */
export const specialArrayII = (
	nums: readonly number[],
	queries: readonly (readonly number[])[],
): boolean[] => {
	const bad = new Int32Array(nums.length);
	for (let i = 1; i < nums.length; i++)
		bad[i] =
			(bad[i - 1] ?? 0) +
			((nums[i] ?? 0) % 2 === (nums[i - 1] ?? 0) % 2 ? 1 : 0);
	return queries.map(([from = 0, to = 0]) => bad[to] === bad[from]);
};
