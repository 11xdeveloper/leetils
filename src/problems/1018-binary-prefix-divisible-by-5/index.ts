/**
 * 1018. Binary Prefix Divisible By 5
 *
 * For each prefix of the bits `nums`, read as a binary number, returns
 * whether it's divisible by 5.
 *
 * Keeps the prefix's value modulo 5, so it never grows.
 *
 * @see https://leetcode.com/problems/binary-prefix-divisible-by-5/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * binaryPrefixDivisibleBy5([0, 1, 1]); // [true, false, false]
 */
export const binaryPrefixDivisibleBy5 = (
	nums: readonly number[],
): boolean[] => {
	let remainder = 0;
	return nums.map((bit) => {
		remainder = (remainder * 2 + bit) % 5;
		return remainder === 0;
	});
};
