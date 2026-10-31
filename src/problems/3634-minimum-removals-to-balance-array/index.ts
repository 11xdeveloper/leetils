/**
 * 3634. Minimum Removals to Balance Array
 *
 * An array is balanced if its largest element is at most `k` times its
 * smallest. Returns the fewest removals that balance `nums`.
 *
 * Keep a sorted window: the most elements kept is the longest run whose
 * end is within k times its start, found with two pointers.
 *
 * @see https://leetcode.com/problems/minimum-removals-to-balance-array/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumRemovalsToBalanceArray([1, 6, 2, 9], 3); // 2
 */
export const minimumRemovalsToBalanceArray = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = [...nums].sort((a, b) => a - b);
	let kept = 0;
	let start = 0;
	sorted.forEach((value, end) => {
		while (value > k * (sorted[start] ?? 0)) start++;
		kept = Math.max(kept, end - start + 1);
	});
	return sorted.length - kept;
};
