/**
 * 1814. Count Nice Pairs in an Array
 *
 * Counts the pairs `i < j` with `nums[i] + rev(nums[j]) =
 * nums[j] + rev(nums[i])`, modulo 10^9 + 7.
 *
 * Rearranged, that's `nums[i] − rev(nums[i]) = nums[j] − rev(nums[j])`, so
 * count pairs with equal differences.
 *
 * @see https://leetcode.com/problems/count-nice-pairs-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n log M) for the largest value M
 * @spaceComplexity O(n)
 *
 * @example
 * countNicePairsInAnArray([13, 10, 35, 24, 76]); // 4
 */
export const countNicePairsInAnArray = (nums: readonly number[]): number => {
	const seen = new Map<number, number>();
	let pairs = 0;
	for (const num of nums) {
		const key = num - Number(String(num).split("").reverse().join(""));
		const earlier = seen.get(key) ?? 0;
		pairs = (pairs + earlier) % 1_000_000_007;
		seen.set(key, earlier + 1);
	}
	return pairs;
};
