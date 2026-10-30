/**
 * 2119. A Number After a Double Reversal
 *
 * Returns whether reversing `num`'s digits twice (dropping leading zeros)
 * gives `num` back.
 *
 * Only trailing zeros are lost, and 0 has none to lose.
 *
 * @see https://leetcode.com/problems/a-number-after-a-double-reversal/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * aNumberAfterADoubleReversal(1800); // false
 */
export const aNumberAfterADoubleReversal = (num: number): boolean =>
	num === 0 || num % 10 !== 0;
