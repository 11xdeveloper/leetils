/**
 * 2856. Minimum Array Length After Pair Removals
 *
 * An operation removes two elements of unequal value. Returns the
 * shortest length reachable.
 *
 * Only copies of the most common value can be left unpaired: if it's
 * more than half the array, `2m - n` remain; otherwise everything pairs
 * off except one element when `n` is odd.
 *
 * @see https://leetcode.com/problems/minimum-array-length-after-pair-removals/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumArrayLengthAfterPairRemovals([2, 3, 4, 4, 4]); // 1
 */
export const minimumArrayLengthAfterPairRemovals = (
	nums: readonly number[],
): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	const most = Math.max(...counts.values());
	const n = nums.length;
	return 2 * most > n ? 2 * most - n : n % 2;
};
