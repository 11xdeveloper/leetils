/**
 * 1464. Maximum Product of Two Elements in an Array
 *
 * Returns the largest `(nums[i] − 1) · (nums[j] − 1)` for two different
 * indices, with every value at least 1.
 *
 * The two largest values give it; one pass finds them.
 *
 * @see https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumProductOfTwoElementsInAnArray([3, 4, 5, 2]); // 12
 */
export const maximumProductOfTwoElementsInAnArray = (
	nums: readonly number[],
): number => {
	let [first, second] = [0, 0];
	for (const num of nums) {
		if (num > first) [first, second] = [num, first];
		else if (num > second) second = num;
	}
	return (first - 1) * (second - 1);
};
