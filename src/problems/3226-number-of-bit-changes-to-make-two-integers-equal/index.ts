/**
 * 3226. Number of Bit Changes to Make Two Integers Equal
 *
 * The fewest set bits of `n` to clear to turn it into `k`, or -1 if `k` has
 * a bit `n` doesn't.
 *
 * Every bit of `n` not in `k` must go.
 *
 * @see https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfBitChangesToMakeTwoIntegersEqual(13, 4); // 2
 */
export const numberOfBitChangesToMakeTwoIntegersEqual = (
	n: number,
	k: number,
): number => {
	if ((n & k) !== k) return -1;
	let changes = 0;
	for (let extra = n ^ k; extra; extra &= extra - 1) changes++;
	return changes;
};
