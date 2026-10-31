/**
 * 2260. Minimum Consecutive Cards to Pick Up
 *
 * Returns the fewest consecutive cards containing a matching pair, or -1.
 *
 * Remember where each value was last seen.
 *
 * @see https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumConsecutiveCardsToPickUp([3, 4, 2, 3, 4, 7]); // 4
 */
export const minimumConsecutiveCardsToPickUp = (
	cards: readonly number[],
): number => {
	const last = new Map<number, number>();
	let best = Infinity;
	for (const [i, card] of cards.entries()) {
		const previous = last.get(card);
		if (previous !== undefined) best = Math.min(best, i - previous + 1);
		last.set(card, i);
	}
	return best === Infinity ? -1 : best;
};
