/**
 * 3868. Minimum Cost to Equalize Arrays Using Swaps
 *
 * Swaps within an array are free; swapping `nums1[i]` with `nums2[i]`
 * costs 1. Returns the least cost to make the arrays identical, or -1.
 *
 * Free swaps make each array a multiset, so each value must split evenly
 * between them. A paid swap moves one surplus element each way, so the
 * cost is the total surplus in `nums1`.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-equalize-arrays-using-swaps/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToEqualizeArraysUsingSwaps([10, 10], [20, 20]); // 1
 */
export const minimumCostToEqualizeArraysUsingSwaps = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const balance = new Map<number, number>();
	for (const x of nums1) balance.set(x, (balance.get(x) ?? 0) + 1);
	for (const x of nums2) balance.set(x, (balance.get(x) ?? 0) - 1);
	let surplus = 0;
	for (const difference of balance.values()) {
		if (difference % 2 !== 0) return -1;
		if (difference > 0) surplus += difference / 2;
	}
	return surplus;
};
