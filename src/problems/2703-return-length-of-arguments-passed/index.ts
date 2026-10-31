/**
 * 2703. Return Length of Arguments Passed
 *
 * The number of arguments the function was called with.
 *
 * Collect them with a rest parameter and return its length.
 *
 * @see https://leetcode.com/problems/return-length-of-arguments-passed/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * returnLengthOfArgumentsPassed({}, null, "3"); // 3
 */
export function returnLengthOfArgumentsPassed(...args: unknown[]): number {
	return args.length;
}
