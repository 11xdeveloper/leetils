/**
 * 3134. Find the Median of the Uniqueness Array
 *
 * The median (the lower one on a tie) of the sorted list of distinct-value
 * counts of every subarray of `nums`.
 *
 * Binary search on the answer d: count the subarrays with at most d
 * distinct values using a sliding window, and find the smallest d covering
 * at least half of all subarrays.
 *
 * @see https://leetcode.com/problems/find-the-median-of-the-uniqueness-array/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheMedianOfTheUniquenessArray([3, 4, 3, 4, 5]); // 2
 */
export const findTheMedianOfTheUniquenessArray = (
	nums: readonly number[],
): number => {
	const n = nums.length;
	const total = (n * (n + 1)) / 2;
	const atMost = (d: number): number => {
		const counts = new Map<number, number>();
		let subarrays = 0;
		for (let left = 0, right = 0; right < n; right++) {
			const value = nums[right] ?? 0;
			counts.set(value, (counts.get(value) ?? 0) + 1);
			while (counts.size > d) {
				const dropped = nums[left++] ?? 0;
				const count = (counts.get(dropped) ?? 0) - 1;
				if (count === 0) counts.delete(dropped);
				else counts.set(dropped, count);
			}
			subarrays += right - left + 1;
		}
		return subarrays;
	};
	let lo = 1;
	let hi = new Set(nums).size;
	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (atMost(mid) >= Math.ceil(total / 2)) hi = mid;
		else lo = mid + 1;
	}
	return lo;
};
