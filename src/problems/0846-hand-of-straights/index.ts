/**
 * 846. Hand of Straights
 *
 * Returns whether the cards in `hand` can be split into groups of
 * `groupSize` consecutive values.
 *
 * The smallest remaining card must start a group, so it repeatedly takes
 * the smallest card and removes the run of `groupSize` values from it,
 * working through the distinct values in order with their counts.
 *
 * @see https://leetcode.com/problems/hand-of-straights/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * handOfStraights([1, 2, 3, 6, 2, 3, 4, 7, 8], 3); // true: [1, 2, 3], [2, 3, 4], [6, 7, 8]
 */
export const handOfStraights = (
	hand: readonly number[],
	groupSize: number,
): boolean => {
	if (hand.length % groupSize !== 0) return false;
	const counts = new Map<number, number>();
	for (const card of hand) counts.set(card, (counts.get(card) ?? 0) + 1);

	for (const start of [...counts.keys()].sort((a, b) => a - b)) {
		const groups = counts.get(start) ?? 0;
		if (groups === 0) continue;
		for (let card = start; card < start + groupSize; card++) {
			const available = counts.get(card) ?? 0;
			if (available < groups) return false;
			counts.set(card, available - groups);
		}
	}
	return true;
};
