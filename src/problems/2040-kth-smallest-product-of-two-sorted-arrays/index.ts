/**
 * 2040. Kth Smallest Product of Two Sorted Arrays
 *
 * Returns the `k`-th smallest (1-based) of the products
 * `nums1[i] · nums2[j]` of two sorted arrays.
 *
 * Binary search on the product. For a candidate `x`, count the pairs with
 * product at most `x`: for each `a` the products `a · b` are sorted along
 * `nums2` (reversed when `a` is negative), so a binary search counts them.
 *
 * @see https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays/
 * @difficulty Hard
 * @timeComplexity O(n log m log R) over the product range R
 * @spaceComplexity O(1)
 *
 * @example
 * kthSmallestProductOfTwoSortedArrays([-4, -2, 0, 3], [2, 4], 6); // 0
 */
export const kthSmallestProductOfTwoSortedArrays = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number => {
	/** The first index in nums2 where `test` holds, given it holds on a suffix. */
	const firstWhere = (test: (b: number) => boolean): number => {
		let [lo, hi] = [0, nums2.length];
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (test(nums2[mid] ?? 0)) hi = mid;
			else lo = mid + 1;
		}
		return lo;
	};
	const countAtMost = (x: number): number => {
		let count = 0;
		for (const a of nums1) {
			if (a > 0) count += firstWhere((b) => a * b > x);
			else if (a < 0) count += nums2.length - firstWhere((b) => a * b <= x);
			else if (x >= 0) count += nums2.length;
		}
		return count;
	};
	let [lo, hi] = [-1e10, 1e10];
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (countAtMost(mid) >= k) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
