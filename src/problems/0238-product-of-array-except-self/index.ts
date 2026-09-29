/**
 * 238. Product of Array Except Self
 *
 * Returns an array where each element is the product of every element of
 * `nums` except the one at that index, without using division.
 *
 * Each answer is the product of everything to its left times everything to
 * its right. A first pass fills in the left products; a second, from the
 * right, multiplies in a running right product, so no other extra array is
 * needed.
 *
 * @see https://leetcode.com/problems/product-of-array-except-self/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * productOfArrayExceptSelf([1, 2, 3, 4]); // [24, 12, 8, 6]
 */
export const productOfArrayExceptSelf = (nums: readonly number[]): number[] => {
	const products = new Array<number>(nums.length).fill(1);

	for (let i = 1; i < nums.length; i++) {
		products[i] = (products[i - 1] ?? 1) * (nums[i - 1] ?? 1);
	}

	let right = 1;
	for (let i = nums.length - 1; i >= 0; i--) {
		// `|| 0` turns a -0 product into 0.
		products[i] = (products[i] ?? 1) * right || 0;
		right *= nums[i] ?? 1;
	}

	return products;
};
