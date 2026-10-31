/**
 * 3732. Maximum Product of Three Elements After One Replacement
 *
 * Replace exactly one element of `nums` with any integer from -1e5 to
 * 1e5, then take the largest product of three different elements.
 *
 * Make the replaced element ±1e5 with the right sign, so the product is
 * 1e5 times the largest absolute product of two other elements: the two
 * largest absolute values.
 *
 * @see https://leetcode.com/problems/maximum-product-of-three-elements-after-one-replacement/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProductOfThreeElementsAfterOneReplacement([-5, 7, 0]); // 3500000
 */
export const maximumProductOfThreeElementsAfterOneReplacement = (
	nums: readonly number[],
): number => {
	const [a = 0, b = 0] = nums.map(Math.abs).sort((x, y) => y - x);
	return a * b * 100_000;
};
