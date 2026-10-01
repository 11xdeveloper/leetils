/**
 * 1503. Last Moment Before All Ants Fall Out of a Plank
 *
 * Ants walk at unit speed along a plank of length `n`, those in `left`
 * leftwards and those in `right` rightwards, turning round when they meet.
 * Returns when the last ant falls off.
 *
 * Two ants bouncing off each other look exactly like two ants passing
 * through each other, so each ant can be treated as walking straight off
 * its own end.
 *
 * @see https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank/
 * @difficulty Medium
 * @timeComplexity O(a) for a ants
 * @spaceComplexity O(1)
 *
 * @example
 * lastMomentBeforeAllAntsFallOutOfAPlank(4, [4, 3], [0, 1]); // 4
 */
export const lastMomentBeforeAllAntsFallOutOfAPlank = (
	n: number,
	left: readonly number[],
	right: readonly number[],
): number => Math.max(0, ...left, ...right.map((position) => n - position));
