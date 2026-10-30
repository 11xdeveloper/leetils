/**
 * 2226. Maximum Candies Allocated to K Children
 *
 * Piles may be split but not merged. Returns the most candies each of `k`
 * children can get, every child receiving a sub-pile of the same size.
 *
 * Binary search the size; a pile of `c` yields `⌊c / size⌋` sub-piles.
 *
 * @see https://leetcode.com/problems/maximum-candies-allocated-to-k-children/
 * @difficulty Medium
 * @timeComplexity O(n log max)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumCandiesAllocatedToKChildren([5, 8, 6], 3); // 5
 */
export const maximumCandiesAllocatedToKChildren = (
	candies: readonly number[],
	k: number,
): number => {
	let [lo, hi] = [0, Math.max(...candies)];
	while (lo < hi) {
		const size = Math.ceil((lo + hi) / 2);
		const piles = candies.reduce((sum, c) => sum + Math.floor(c / size), 0);
		if (piles >= k) lo = size;
		else hi = size - 1;
	}
	return lo;
};
