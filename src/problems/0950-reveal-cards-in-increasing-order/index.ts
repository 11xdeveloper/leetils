/**
 * 950. Reveal Cards In Increasing Order
 *
 * Cards are revealed by repeatedly taking the top card and then moving the
 * next top card to the bottom. Returns an ordering of `deck` (distinct
 * values) that reveals the cards in increasing order.
 *
 * Simulates the process on positions instead of cards: a queue of indices
 * gives the order positions are revealed in, and the sorted cards are
 * placed at those positions.
 *
 * @see https://leetcode.com/problems/reveal-cards-in-increasing-order/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * revealCardsInIncreasingOrder([17, 13, 11, 2, 3, 5, 7]); // [2, 13, 3, 11, 5, 17, 7]
 */
export const revealCardsInIncreasingOrder = (
	deck: readonly number[],
): number[] => {
	const n = deck.length;
	const positions = Array.from({ length: n }, (_, i) => i);
	const result = new Array<number>(n);
	let head = 0;
	for (const card of deck.toSorted((a, b) => a - b)) {
		result[positions[head++] ?? 0] = card;
		if (head < positions.length) positions.push(positions[head++] ?? 0);
	}
	return result;
};
