/**
 * 1748. Sum of Unique Elements
 *
 * Returns the sum of the elements of `nums` that appear exactly once.
 *
 * Counts each value, then sums those seen once.
 *
 * @see https://leetcode.com/problems/sum-of-unique-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfUniqueElements([1, 2, 3, 2]); // 4
 */
export const sumOfUniqueElements = (nums: readonly number[]): number => {
	const counts = new Map<number, number>();
	for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);
	let sum = 0;
	for (const [value, count] of counts) if (count === 1) sum += value;
	return sum;
};
