/**
 * 992. Subarrays with K Different Integers
 *
 * Counts the subarrays of `nums` containing exactly `k` distinct integers.
 *
 * Exactly `k` is at most `k` minus at most `k - 1`. Counting subarrays with
 * at most `m` distinct values is a sliding window: for each right end, all
 * starts from the window's left edge onward work.
 *
 * @see https://leetcode.com/problems/subarrays-with-k-different-integers/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * subarraysWithKDifferentIntegers([1, 2, 1, 2, 3], 2); // 7
 */
export const subarraysWithKDifferentIntegers = (
	nums: readonly number[],
	k: number,
): number => {
	const atMost = (limit: number): number => {
		const counts = new Map<number, number>();
		let total = 0;
		for (let left = 0, right = 0; right < nums.length; right++) {
			const value = nums[right] ?? 0;
			counts.set(value, (counts.get(value) ?? 0) + 1);
			while (counts.size > limit) {
				const leaving = nums[left++] ?? 0;
				const remaining = (counts.get(leaving) ?? 1) - 1;
				if (remaining === 0) counts.delete(leaving);
				else counts.set(leaving, remaining);
			}
			total += right - left + 1;
		}
		return total;
	};
	return atMost(k) - atMost(k - 1);
};
