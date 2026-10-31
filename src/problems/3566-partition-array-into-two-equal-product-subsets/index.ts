/**
 * 3566. Partition Array into Two Equal Product Subsets
 *
 * Whether `nums` can be split into two non-empty groups whose products are
 * both `target`.
 *
 * Try every subset as the first group, with exact BigInt products.
 *
 * @see https://leetcode.com/problems/partition-array-into-two-equal-product-subsets/
 * @difficulty Medium
 * @timeComplexity O(2ⁿ · n)
 * @spaceComplexity O(n)
 *
 * @example
 * partitionArrayIntoTwoEqualProductSubsets([3, 1, 6, 8, 4], 24); // true
 */
export const partitionArrayIntoTwoEqualProductSubsets = (
	nums: readonly number[],
	target: number,
): boolean => {
	const n = nums.length;
	const goal = BigInt(target);
	for (let mask = 1; mask < (1 << n) - 1; mask++) {
		let a = 1n;
		let b = 1n;
		nums.forEach((num, i) => {
			if ((mask >> i) & 1) a *= BigInt(num);
			else b *= BigInt(num);
		});
		if (a === goal && b === goal) return true;
	}
	return false;
};
