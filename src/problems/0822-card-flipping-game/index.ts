/**
 * 822. Card Flipping Game
 *
 * Each card has a number on its front and back. After flipping any cards,
 * a number is good if it's on the back of some card and on no card's
 * front. Returns the smallest possible good number, or 0 if there's none.
 *
 * A number on both sides of one card can never be good. Any other number
 * can: flip every card so that number is face down. So the answer is the
 * smallest number that isn't on both sides of any card.
 *
 * @see https://leetcode.com/problems/card-flipping-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * cardFlippingGame([1, 2, 4, 4, 7], [1, 3, 4, 1, 3]); // 2
 */
export const cardFlippingGame = (
	fronts: readonly number[],
	backs: readonly number[],
): number => {
	const stuck = new Set(fronts.filter((front, i) => front === backs[i]));
	let best = Number.POSITIVE_INFINITY;
	for (const number of [...fronts, ...backs])
		if (!stuck.has(number)) best = Math.min(best, number);
	return best === Number.POSITIVE_INFINITY ? 0 : best;
};
