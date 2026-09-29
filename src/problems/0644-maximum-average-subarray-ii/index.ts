/**
 * 644. Maximum Average Subarray II
 *
 * Returns the largest average of any subarray of `nums` with at least `k`
 * elements, within 10^-5.
 *
 * Binary search on the answer. Some subarray of length at least `k` has
 * average at least `m` exactly when, with `m` subtracted from every element,
 * some such subarray has a non-negative sum. That's a prefix sum minus the
 * smallest prefix sum at least `k` earlier, found in one pass.
 *
 * @see https://leetcode.com/problems/maximum-average-subarray-ii/
 * @difficulty Hard
 * @timeComplexity O(n · log((max - min) / ε))
 * @spaceComplexity O(1)
 *
 * @example
 * maximumAverageSubarrayII([1, 12, -5, -6, 50, 3], 4); // ≈ 12.75
 */
export const maximumAverageSubarrayII = (
	nums: readonly number[],
	k: number,
): number => {
	const reaches = (average: number): boolean => {
		let sum = 0;
		let lagging = 0;
		let smallestLagging = 0;
		for (let i = 0; i < k; i++) sum += (nums[i] ?? 0) - average;
		if (sum >= 0) return true;
		for (let i = k; i < nums.length; i++) {
			sum += (nums[i] ?? 0) - average;
			lagging += (nums[i - k] ?? 0) - average;
			smallestLagging = Math.min(smallestLagging, lagging);
			if (sum - smallestLagging >= 0) return true;
		}
		return false;
	};

	let low = Math.min(...nums);
	let high = Math.max(...nums);
	while (high - low > 1e-6) {
		const mid = (low + high) / 2;
		if (reaches(mid)) low = mid;
		else high = mid;
	}
	return low;
};
