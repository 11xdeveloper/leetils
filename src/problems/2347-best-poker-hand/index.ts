/**
 * 2347. Best Poker Hand
 *
 * Returns the best of "Flush", "Three of a Kind", "Pair" and "High Card"
 * for five cards.
 *
 * Check the suits, then the most repeated rank.
 *
 * @see https://leetcode.com/problems/best-poker-hand/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * bestPokerHand([13, 2, 3, 1, 9], ["a", "a", "a", "a", "a"]); // "Flush"
 */
export const bestPokerHand = (
	ranks: readonly number[],
	suits: readonly string[],
): string => {
	if (new Set(suits).size === 1) return "Flush";
	const counts = new Map<number, number>();
	for (const rank of ranks) counts.set(rank, (counts.get(rank) ?? 0) + 1);
	const most = Math.max(...counts.values());
	if (most >= 3) return "Three of a Kind";
	return most === 2 ? "Pair" : "High Card";
};
