/**
 * 1079. Letter Tile Possibilities
 *
 * Counts the distinct non-empty sequences that can be spelled with the
 * letter tiles in `tiles`, each tile used at most once.
 *
 * Backtracking over the distinct letters with their remaining counts:
 * every choice of next letter makes a new sequence, which is counted and
 * then extended.
 *
 * @see https://leetcode.com/problems/letter-tile-possibilities/
 * @difficulty Medium
 * @timeComplexity O(the number of sequences)
 * @spaceComplexity O(n)
 *
 * @example
 * letterTilePossibilities("AAB"); // 8
 */
export const letterTilePossibilities = (tiles: string): number => {
	const counts = new Map<string, number>();
	for (const tile of tiles) counts.set(tile, (counts.get(tile) ?? 0) + 1);
	const extend = (): number => {
		let total = 0;
		for (const [letter, count] of counts) {
			if (count === 0) continue;
			counts.set(letter, count - 1);
			total += 1 + extend();
			counts.set(letter, count);
		}
		return total;
	};
	return extend();
};
