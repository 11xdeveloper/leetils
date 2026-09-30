/**
 * 1283. Find the Smallest Divisor Given a Threshold
 *
 * Returns the smallest positive divisor for which the sum of `nums`
 * divided by it, each rounded up, is at most `threshold`.
 *
 * That sum only falls as the divisor grows, so binary search between 1 and
 * the largest number (where every quotient is 1).
 *
 * @see https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/
 * @difficulty Medium
 * @timeComplexity O(n log(max))
 * @spaceComplexity O(1)
 *
 * @example
 * findTheSmallestDivisorGivenAThreshold([1, 2, 5, 9], 6); // 5
 */
export const findTheSmallestDivisorGivenAThreshold = (
	nums: readonly number[],
	threshold: number,
): number => {
	let [low, high] = [1, Math.max(...nums)];
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		const total = nums.reduce((sum, num) => sum + Math.ceil(num / mid), 0);
		if (total <= threshold) high = mid;
		else low = mid + 1;
	}
	return low;
};
