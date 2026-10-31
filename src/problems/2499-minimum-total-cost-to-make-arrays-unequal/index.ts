/**
 * 2499. Minimum Total Cost to Make Arrays Unequal
 *
 * Swapping `nums1[i]` and `nums1[j]` costs `i + j`. Returns the least cost
 * to make `nums1[i] !== nums2[i]` everywhere, or -1.
 *
 * Every index where the arrays agree must move, costing its index; those
 * can be swapped among themselves unless one value dominates (more than
 * half of them). Then bring in the cheapest other indices whose values
 * differ from it in both arrays, one per surplus.
 *
 * @see https://leetcode.com/problems/minimum-total-cost-to-make-arrays-unequal/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTotalCostToMakeArraysUnequal([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]); // 10
 */
export const minimumTotalCostToMakeArraysUnequal = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const counts = new Map<number, number>();
	let [cost, equal, dominant, dominantCount] = [0, 0, -1, 0];
	for (const [i, value] of nums1.entries()) {
		if (value !== nums2[i]) continue;
		cost += i;
		equal++;
		const count = (counts.get(value) ?? 0) + 1;
		counts.set(value, count);
		if (count > dominantCount) [dominant, dominantCount] = [value, count];
	}
	let surplus = 2 * dominantCount - equal;
	for (let i = 0; i < nums1.length && surplus > 0; i++) {
		const [a, b] = [nums1[i], nums2[i]];
		if (a === b || a === dominant || b === dominant) continue;
		cost += i;
		surplus--;
	}
	return surplus > 0 ? -1 : cost;
};
