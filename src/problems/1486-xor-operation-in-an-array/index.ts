/**
 * 1486. XOR Operation in an Array
 *
 * Returns the XOR of `start, start + 2, …, start + 2(n − 1)`.
 *
 * XORs the terms together.
 *
 * @see https://leetcode.com/problems/xor-operation-in-an-array/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * xorOperationInAnArray(5, 0); // 8
 */
export const xorOperationInAnArray = (n: number, start: number): number => {
	let result = 0;
	for (let i = 0; i < n; i++) result ^= start + 2 * i;
	return result;
};
