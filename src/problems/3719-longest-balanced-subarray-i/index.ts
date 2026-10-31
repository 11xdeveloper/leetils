/**
 * 3719. Longest Balanced Subarray I
 *
 * A subarray is balanced if it has as many distinct even values as
 * distinct odd ones. Returns the longest balanced length.
 *
 * Extend from every start, tracking the distinct values of each parity.
 *
 * @see https://leetcode.com/problems/longest-balanced-subarray-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * longestBalancedSubarrayI([3, 2, 2, 5, 4]); // 5
 */
export const longestBalancedSubarrayI = (nums: readonly number[]): number => {
	let best = 0;
	for (let i = 0; i < nums.length; i++) {
		const seen = new Set<number>();
		let balance = 0;
		for (let j = i; j < nums.length; j++) {
			const num = nums[j] ?? 0;
			if (!seen.has(num)) {
				seen.add(num);
				balance += num % 2 === 0 ? 1 : -1;
			}
			if (balance === 0) best = Math.max(best, j - i + 1);
		}
	}
	return best;
};
