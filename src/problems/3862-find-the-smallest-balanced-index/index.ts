/**
 * 3862. Find the Smallest Balanced Index
 *
 * The first index where the sum of the elements before it equals the
 * product of the elements after it (an empty sum is 0, an empty product
 * 1), or -1.
 *
 * Suffix products, capped once they pass any possible sum so they stay
 * exact where it matters.
 *
 * @see https://leetcode.com/problems/find-the-smallest-balanced-index/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheSmallestBalancedIndex([2, 8, 2, 2, 5]); // 2
 */
export const findTheSmallestBalancedIndex = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const cap = 1e15;
	const after = new Array<number>(n + 1).fill(1);
	for (let i = n - 1; i >= 0; i--)
		after[i] = Math.min(cap, (after[i + 1] ?? 1) * (nums[i] ?? 1));
	let before = 0;
	for (let i = 0; i < n; i++) {
		if (before === after[i + 1]) return i;
		before += nums[i] ?? 0;
	}
	return -1;
};
