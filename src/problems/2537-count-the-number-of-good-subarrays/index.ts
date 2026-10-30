/**
 * 2537. Count the Number of Good Subarrays
 *
 * A subarray is good if it has at least `k` pairs of indices holding
 * equal values. Returns the number of good subarrays.
 *
 * For each right end, shrink the window from the left while it stays
 * good; every start before the window's left edge then gives a good
 * subarray.
 *
 * @see https://leetcode.com/problems/count-the-number-of-good-subarrays/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countTheNumberOfGoodSubarrays([3, 1, 4, 3, 2, 2, 4], 2); // 4
 */
export const countTheNumberOfGoodSubarrays = (
	nums: readonly number[],
	k: number,
): number => {
	const counts = new Map<number, number>();
	let pairs = 0;
	let left = 0;
	let good = 0;
	for (const num of nums) {
		const count = counts.get(num) ?? 0;
		pairs += count;
		counts.set(num, count + 1);
		for (;;) {
			const dropped = nums[left] ?? 0;
			const droppedCount = counts.get(dropped) ?? 0;
			if (pairs - (droppedCount - 1) < k) break;
			pairs -= droppedCount - 1;
			counts.set(dropped, droppedCount - 1);
			left++;
		}
		if (pairs >= k) good += left + 1;
	}
	return good;
};
