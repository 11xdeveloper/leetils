/**
 * 1695. Maximum Erasure Value
 *
 * Returns the largest sum of a subarray of `nums` (all positive) with no
 * repeated values.
 *
 * A sliding window that drops elements from the left until the newest
 * value is unique in it.
 *
 * @see https://leetcode.com/problems/maximum-erasure-value/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumErasureValue([4, 2, 4, 5, 6]); // 17
 */
export const maximumErasureValue = (nums: readonly number[]): number => {
	const inWindow = new Set<number>();
	let [best, sum, left] = [0, 0, 0];
	for (const num of nums) {
		while (inWindow.has(num)) {
			const dropped = nums[left] ?? 0;
			inWindow.delete(dropped);
			sum -= dropped;
			left++;
		}
		inWindow.add(num);
		sum += num;
		best = Math.max(best, sum);
	}
	return best;
};
