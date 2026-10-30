/**
 * 2653. Sliding Subarray Beauty
 *
 * A subarray's beauty is its `x`-th smallest negative number, or 0 if it
 * has fewer than `x` negatives. Returns the beauty of every length-`k`
 * subarray.
 *
 * Values lie in [-50, 50], so keep counts of each negative value in the
 * window and walk them from -50 up.
 *
 * @see https://leetcode.com/problems/sliding-subarray-beauty/
 * @difficulty Medium
 * @timeComplexity O(50 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * slidingSubarrayBeauty([1, -1, -3, -2, 3], 3, 2); // [-1, -2, -2]
 */
export const slidingSubarrayBeauty = (
	nums: readonly number[],
	k: number,
	x: number,
): number[] => {
	const counts = Array.from({ length: 50 }, () => 0);
	const adjust = (value: number, change: number): void => {
		if (value < 0) counts[value + 50] = (counts[value + 50] ?? 0) + change;
	};
	const beauty: number[] = [];
	for (let i = 0; i < nums.length; i++) {
		adjust(nums[i] ?? 0, 1);
		if (i >= k) adjust(nums[i - k] ?? 0, -1);
		if (i < k - 1) continue;
		let seen = 0;
		let value = 0;
		for (let v = 0; v < 50; v++) {
			seen += counts[v] ?? 0;
			if (seen >= x) {
				value = v - 50;
				break;
			}
		}
		beauty.push(value);
	}
	return beauty;
};
