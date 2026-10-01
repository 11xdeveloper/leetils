/**
 * 1726. Tuple with Same Product
 *
 * Counts the tuples `(a, b, c, d)` of distinct elements of `nums` (all
 * distinct) with `a · b = c · d`.
 *
 * Count pairs by product. Any two pairs with the same product use four
 * distinct elements and give 8 tuples.
 *
 * @see https://leetcode.com/problems/tuple-with-same-product/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * tupleWithSameProduct([2, 3, 4, 6]); // 8
 */
export const tupleWithSameProduct = (nums: readonly number[]): number => {
	const pairs = new Map<number, number>();
	let tuples = 0;
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			const product = (nums[i] ?? 0) * (nums[j] ?? 0);
			const earlier = pairs.get(product) ?? 0;
			tuples += 8 * earlier;
			pairs.set(product, earlier + 1);
		}
	}
	return tuples;
};
