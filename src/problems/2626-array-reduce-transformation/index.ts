/**
 * 2626. Array Reduce Transformation
 *
 * Reduce `nums` with `fn`, starting from `init`, without
 * `Array.prototype.reduce`. An empty array gives `init`.
 *
 * Fold the elements in order into an accumulator.
 *
 * @see https://leetcode.com/problems/array-reduce-transformation/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * arrayReduceTransformation([1, 2, 3, 4], (acc, x) => acc + x, 0); // 10
 */
export function arrayReduceTransformation(
	nums: readonly number[],
	fn: (accum: number, curr: number) => number,
	init: number,
): number {
	let accum = init;
	for (const num of nums) accum = fn(accum, num);
	return accum;
}
