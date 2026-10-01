/**
 * 1567. Maximum Length of Subarray With Positive Product
 *
 * Returns the length of the longest subarray of `nums` whose product is
 * positive.
 *
 * Tracks the longest subarray ending here with a positive product and with
 * a negative one. A positive number extends both; a negative one swaps
 * them; a zero resets both.
 *
 * @see https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumLengthOfSubarrayWithPositiveProduct([0, 1, -2, -3, -4]); // 3
 */
export const maximumLengthOfSubarrayWithPositiveProduct = (
	nums: readonly number[],
): number => {
	let [positive, negative, longest] = [0, 0, 0];
	for (const num of nums) {
		if (num > 0)
			[positive, negative] = [positive + 1, negative > 0 ? negative + 1 : 0];
		else if (num < 0)
			[positive, negative] = [negative > 0 ? negative + 1 : 0, positive + 1];
		else [positive, negative] = [0, 0];
		longest = Math.max(longest, positive);
	}
	return longest;
};
