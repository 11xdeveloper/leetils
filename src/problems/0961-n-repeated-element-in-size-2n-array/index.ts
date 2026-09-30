/**
 * 961. N-Repeated Element in Size 2N Array
 *
 * `nums` has `2n` elements: `n + 1` distinct values, one of which appears
 * `n` times. Returns that value.
 *
 * Every other value appears once, so the first value seen twice is the
 * answer.
 *
 * @see https://leetcode.com/problems/n-repeated-element-in-size-2n-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * nRepeatedElementInSize2nArray([1, 2, 3, 3]); // 3
 */
export const nRepeatedElementInSize2nArray = (
	nums: readonly number[],
): number => {
	const seen = new Set<number>();
	for (const num of nums) {
		if (seen.has(num)) return num;
		seen.add(num);
	}
	return -1;
};
