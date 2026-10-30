import { Heap } from "../../internal/heap";

/**
 * 2599. Make the Prefix Sum Non-negative
 *
 * An operation moves any element to the end of the array. Returns the
 * fewest operations that make every prefix sum non-negative; the total
 * is guaranteed to be non-negative.
 *
 * Scan left to right. Whenever the prefix dips below zero, move the most
 * negative element seen so far to the end, which helps the most.
 *
 * @see https://leetcode.com/problems/make-the-prefix-sum-non-negative/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeThePrefixSumNonNegative([3, -5, -2, 6]); // 1
 */
export const makeThePrefixSumNonNegative = (
	nums: readonly number[],
): number => {
	const negatives = new Heap<number>((a, b) => a - b);
	let prefix = 0;
	let moves = 0;
	for (const num of nums) {
		if (num < 0) negatives.push(num);
		prefix += num;
		if (prefix < 0) {
			prefix -= negatives.pop() ?? 0;
			moves++;
		}
	}
	return moves;
};
