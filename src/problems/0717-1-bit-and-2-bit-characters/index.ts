/**
 * 717. 1-bit and 2-bit Characters
 *
 * One character is written `0`, two others `10` and `11`. Given `bits`
 * ending in 0, returns whether its last character must be the one-bit
 * character.
 *
 * Decodes from the start, stepping over two bits after a 1 and one after a
 * 0, and checks whether a character starts at the last bit.
 *
 * @see https://leetcode.com/problems/1-bit-and-2-bit-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * oneBitAnd2BitCharacters([1, 1, 1, 0]); // false: 11, 10
 */
export const oneBitAnd2BitCharacters = (bits: readonly number[]): boolean => {
	let i = 0;
	while (i < bits.length - 1) i += (bits[i] ?? 0) + 1;
	return i === bits.length - 1;
};
