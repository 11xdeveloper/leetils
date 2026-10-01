/**
 * 1577. Number of Ways Where Square of Number Is Equal to Product of Two Numbers
 *
 * Counts triples where the square of an element of one array equals the
 * product of two elements (at different positions) of the other, in both
 * directions.
 *
 * Counts each square in the first array, then checks every pair of the
 * other array against it.
 *
 * @see https://leetcode.com/problems/number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers/
 * @difficulty Medium
 * @timeComplexity O(m^2 + n^2)
 * @spaceComplexity O(m + n)
 *
 * @example
 * numberOfWaysWhereSquareOfNumberIsEqualToProductOfTwoNumbers([1, 1], [1, 1, 1]); // 9
 */
export const numberOfWaysWhereSquareOfNumberIsEqualToProductOfTwoNumbers = (
	nums1: readonly number[],
	nums2: readonly number[],
): number => {
	const count = (squares: readonly number[], pairs: readonly number[]) => {
		const counts = new Map<number, number>();
		for (const value of squares)
			counts.set(value * value, (counts.get(value * value) ?? 0) + 1);
		let total = 0;
		for (let j = 0; j < pairs.length; j++) {
			for (let k = j + 1; k < pairs.length; k++)
				total += counts.get((pairs[j] ?? 0) * (pairs[k] ?? 0)) ?? 0;
		}
		return total;
	};
	return count(nums1, nums2) + count(nums2, nums1);
};
