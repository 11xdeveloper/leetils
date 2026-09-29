/**
 * 327. Count of Range Sum
 *
 * Returns how many contiguous subarrays of `nums` have a sum between `lower`
 * and `upper`, inclusive.
 *
 * Each subarray's sum is `prefix[j] - prefix[i]` for some `i < j`. Merge
 * sort over the prefix sums counts those pairs: before merging two sorted
 * halves, for each prefix sum in the left half, two pointers find the range
 * of right-half sums within `[lower, upper]` above it.
 *
 * @see https://leetcode.com/problems/count-of-range-sum/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * countOfRangeSum([-2, 5, -1], -2, 2); // 3: [-2], [-1] and [-2, 5, -1]
 */
export const countOfRangeSum = (
	nums: readonly number[],
	lower: number,
	upper: number,
): number => {
	const prefix = [0];
	for (const num of nums) prefix.push((prefix.at(-1) ?? 0) + num);

	const countAndSort = (start: number, end: number): number => {
		if (end - start <= 1) return 0;
		const mid = Math.floor((start + end) / 2);
		let count = countAndSort(start, mid) + countAndSort(mid, end);

		// Both halves are sorted: slide a window of right-half sums for each left-half sum.
		let low = mid;
		let high = mid;
		for (let i = start; i < mid; i++) {
			const left = prefix[i] ?? 0;
			while (low < end && (prefix[low] ?? 0) - left < lower) low++;
			while (high < end && (prefix[high] ?? 0) - left <= upper) high++;
			count += high - low;
		}

		const merged = prefix.slice(start, end).sort((a, b) => a - b);
		prefix.splice(start, merged.length, ...merged);
		return count;
	};

	return countAndSort(0, prefix.length);
};
