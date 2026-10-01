/**
 * 719. Find K-th Smallest Pair Distance
 *
 * Returns the `k`th smallest (from 1) of the distances `|nums[i] - nums[j]|`
 * over all pairs `i < j`.
 *
 * Binary search on the distance. After sorting, the pairs with distance at
 * most `d` are counted with two pointers in one pass, and the answer is
 * the smallest `d` with at least `k` of them.
 *
 * @see https://leetcode.com/problems/find-k-th-smallest-pair-distance/
 * @difficulty Hard
 * @timeComplexity O(n log n + n log W) where W is the largest distance
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * findKThSmallestPairDistance([1, 3, 1], 1); // 0
 */
export const findKThSmallestPairDistance = (
	nums: readonly number[],
	k: number,
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let low = 0;
	let high = (sorted.at(-1) ?? 0) - (sorted[0] ?? 0);

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		let count = 0;
		for (let left = 0, right = 0; right < sorted.length; right++) {
			while ((sorted[right] ?? 0) - (sorted[left] ?? 0) > mid) left++;
			count += right - left;
		}
		if (count >= k) high = mid;
		else low = mid + 1;
	}

	return low;
};
