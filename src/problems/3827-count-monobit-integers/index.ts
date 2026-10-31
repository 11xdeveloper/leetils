/**
 * 3827. Count Monobit Integers
 *
 * Counts the integers from 0 to `n` whose binary digits are all the same:
 * 0 and the numbers 2^b - 1.
 *
 * @see https://leetcode.com/problems/count-monobit-integers/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countMonobitIntegers(4); // 3
 */
export const countMonobitIntegers = (n: number): number => {
	let count = 1;
	for (let x = 1; x <= n; x = 2 * x + 1) count++;
	return count;
};
