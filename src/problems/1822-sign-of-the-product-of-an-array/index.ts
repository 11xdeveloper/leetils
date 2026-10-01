/**
 * 1822. Sign of the Product of an Array
 *
 * Returns the sign (1, -1 or 0) of the product of `nums`.
 *
 * Any zero makes it 0; otherwise count negative numbers.
 *
 * @see https://leetcode.com/problems/sign-of-the-product-of-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * signOfTheProductOfAnArray([-1, -2, -3, -4, 3, 2, 1]); // 1
 */
export const signOfTheProductOfAnArray = (nums: readonly number[]): number => {
	let sign = 1;
	for (const num of nums) {
		if (num === 0) return 0;
		if (num < 0) sign = -sign;
	}
	return sign;
};
