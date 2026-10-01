/**
 * 914. X of a Kind in a Deck of Cards
 *
 * Returns whether the deck can be split into groups of the same size `x > 1`
 * where every card in a group has the same number.
 *
 * Each value's count must be a multiple of `x`, so it's possible exactly
 * when the counts share a divisor above 1.
 *
 * @see https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards/
 * @difficulty Easy
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * xOfAKindInADeckOfCards([1, 2, 3, 4, 4, 3, 2, 1]); // true
 */
export const xOfAKindInADeckOfCards = (deck: readonly number[]): boolean => {
	const counts = new Map<number, number>();
	for (const card of deck) counts.set(card, (counts.get(card) ?? 0) + 1);
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	return [...counts.values()].reduce(gcd, 0) > 1;
};
