/**
 * 628. Maximum Product of Three Numbers
 *
 * Returns the largest product of three numbers from `nums`.
 *
 * The best product uses either the three largest numbers, or the largest
 * with the two smallest (two negatives make a positive). One pass tracks
 * those five numbers.
 *
 * @see https://leetcode.com/problems/maximum-product-of-three-numbers/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumProductOfThreeNumbers([-10, -3, 1, 2]); // 60
 */
export const maximumProductOfThreeNumbers = (
	nums: readonly number[],
): number => {
	let [max1, max2, max3] = [
		Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY,
	];
	let [min1, min2] = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

	for (const num of nums) {
		if (num > max1) [max1, max2, max3] = [num, max1, max2];
		else if (num > max2) [max2, max3] = [num, max2];
		else if (num > max3) max3 = num;

		if (num < min1) [min1, min2] = [num, min1];
		else if (num < min2) min2 = num;
	}

	return Math.max(max1 * max2 * max3, max1 * min1 * min2);
};
