/**
 * 2562. Find the Array Concatenation Value
 *
 * Repeatedly removes the first and last numbers and adds their decimal
 * concatenation to a total; a lone middle number is added as is. Returns
 * the total.
 *
 * Walk two pointers inward.
 *
 * @see https://leetcode.com/problems/find-the-array-concatenation-value/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findTheArrayConcatenationValue([7, 52, 2, 4]); // 596
 */
export const findTheArrayConcatenationValue = (
	nums: readonly number[],
): number => {
	let total = 0;
	for (let i = 0, j = nums.length - 1; i <= j; i++, j--)
		total += i === j ? (nums[i] ?? 0) : Number(`${nums[i]}${nums[j]}`);
	return total;
};
