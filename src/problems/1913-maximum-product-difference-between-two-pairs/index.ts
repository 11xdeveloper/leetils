/**
 * 1913. Maximum Product Difference Between Two Pairs
 *
 * Returns the largest `a·b − c·d` over four distinct indices of `nums`
 * (all positive).
 *
 * The two largest values times each other, minus the two smallest.
 *
 * @see https://leetcode.com/problems/maximum-product-difference-between-two-pairs/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumProductDifferenceBetweenTwoPairs([5, 6, 2, 7, 4]); // 34
 */
export const maximumProductDifferenceBetweenTwoPairs = (
	nums: readonly number[],
): number => {
	const sorted = nums.toSorted((a, b) => a - b);
	return (
		(sorted.at(-1) ?? 0) * (sorted.at(-2) ?? 0) -
		(sorted[0] ?? 0) * (sorted[1] ?? 0)
	);
};
