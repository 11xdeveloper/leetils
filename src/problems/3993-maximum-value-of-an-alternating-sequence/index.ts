/**
 * 3993. Maximum Value of an Alternating Sequence
 *
 * A sequence of `n` integers starts at `s`, alternates strictly up and
 * down, and moves at most `m` per step. Returns the largest value it can
 * reach.
 *
 * Climb m on every rise and drop just 1 on every fall, gaining m - 1 per
 * pair; try starting with a rise or a fall.
 *
 * @see https://leetcode.com/problems/maximum-value-of-an-alternating-sequence/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumValueOfAnAlternatingSequence(4, 3, 5); // 12
 */
export const maximumValueOfAnAlternatingSequence = (
	n: number,
	s: number,
	m: number,
): number => {
	if (n === 1) return s;
	const risingFirst = Math.ceil((n - 1) / 2);
	const fallingFirst = Math.floor((n - 1) / 2);
	return Math.max(
		s + risingFirst * m - (risingFirst - 1),
		s + fallingFirst * (m - 1),
	);
};
