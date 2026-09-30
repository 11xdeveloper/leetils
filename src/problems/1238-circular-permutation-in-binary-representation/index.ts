/**
 * 1238. Circular Permutation in Binary Representation
 *
 * Returns an ordering of `0 … 2^n − 1` starting at `start` in which
 * neighbours, including the last and first, differ in exactly one bit.
 *
 * The reflected Gray code `i ^ (i >> 1)` is such a cycle starting at 0.
 * XORing every entry with `start` keeps neighbours one bit apart and makes
 * it start at `start`.
 *
 * @see https://leetcode.com/problems/circular-permutation-in-binary-representation/
 * @difficulty Medium
 * @timeComplexity O(2^n)
 * @spaceComplexity O(2^n), for the result
 *
 * @example
 * circularPermutationInBinaryRepresentation(2, 3); // [3, 2, 0, 1]
 */
export const circularPermutationInBinaryRepresentation = (
	n: number,
	start: number,
): number[] => Array.from({ length: 2 ** n }, (_, i) => i ^ (i >> 1) ^ start);
