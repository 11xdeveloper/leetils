/**
 * 1099. Two Sum Less Than K
 *
 * Returns the largest `nums[i] + nums[j]` (with `i ≠ j`) that is less than
 * `k`, or -1 if no pair qualifies.
 *
 * After sorting, two pointers from the ends: a sum below `k` is a
 * candidate and moves the left pointer up; otherwise the right moves down.
 *
 * @see https://leetcode.com/problems/two-sum-less-than-k/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n) for the sorted copy
 *
 * @example
 * twoSumLessThanK([34, 23, 1, 24, 75, 33, 54, 8], 60); // 58
 */
export const twoSumLessThanK = (nums: readonly number[], k: number): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	let best = -1;
	for (let low = 0, high = sorted.length - 1; low < high; ) {
		const sum = (sorted[low] ?? 0) + (sorted[high] ?? 0);
		if (sum < k) {
			best = Math.max(best, sum);
			low++;
		} else {
			high--;
		}
	}
	return best;
};
