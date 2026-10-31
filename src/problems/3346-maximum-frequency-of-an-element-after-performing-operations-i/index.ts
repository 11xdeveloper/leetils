/**
 * 3346. Maximum Frequency of an Element After Performing Operations I
 *
 * Up to `numOperations` times, add a number from [-k, k] to a different
 * element of `nums`. Returns the highest frequency any value can reach.
 *
 * A target T can collect every element within k of it, but only
 * `numOperations` of those that don't already equal it. The best targets
 * are existing values and the edges `num ± k` of each window, so try
 * those, counting with binary search in the sorted array.
 *
 * @see https://leetcode.com/problems/maximum-frequency-of-an-element-after-performing-operations-i/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumFrequencyOfAnElementAfterPerformingOperationsI([1, 4, 5], 1, 2); // 2
 */
export const maximumFrequencyOfAnElementAfterPerformingOperationsI = (
	nums: readonly number[],
	k: number,
	numOperations: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	/** The number of elements below `value`. */
	const below = (value: number): number => {
		let lo = 0;
		let hi = sorted.length;
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((sorted[mid] ?? 0) < value) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	};
	let best = 0;
	for (const target of new Set(
		sorted.flatMap((num) => [num, num - k, num + k]),
	)) {
		const reachable = below(target + k + 1) - below(target - k);
		const already = below(target + 1) - below(target);
		best = Math.max(best, Math.min(reachable, already + numOperations));
	}
	return best;
};
