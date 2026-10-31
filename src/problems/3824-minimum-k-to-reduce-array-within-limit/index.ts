/**
 * 3824. Minimum K to Reduce Array Within Limit
 *
 * Reducing an element by k is one operation. Returns the smallest k for
 * which making every element non-positive takes at most k² operations.
 *
 * The operations needed, Σ ⌈x / k⌉, only fall as k grows while k² rises,
 * so binary search k.
 *
 * @see https://leetcode.com/problems/minimum-k-to-reduce-array-within-limit/
 * @difficulty Medium
 * @timeComplexity O(n log V)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumKToReduceArrayWithinLimit([3, 7, 5]); // 3
 */
export const minimumKToReduceArrayWithinLimit = (
	nums: readonly number[],
): number => {
	const fits = (k: number): boolean =>
		nums.reduce((ops, x) => ops + Math.ceil(x / k), 0) <= k * k;
	let [lo, hi] = [1, Math.max(...nums, nums.length)];
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (fits(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
