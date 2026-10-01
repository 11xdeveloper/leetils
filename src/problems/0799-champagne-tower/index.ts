/**
 * 799. Champagne Tower
 *
 * Glasses are stacked in a pyramid, row `i` holding `i + 1` glasses, and
 * `poured` cups of champagne go into the top glass. A full glass (1 cup)
 * splits any excess equally between the two glasses below it. Returns how
 * full the glass at `(queryRow, queryGlass)` is.
 *
 * Simulates row by row how much flows into each glass, passing half of
 * each glass's excess to each glass beneath.
 *
 * @see https://leetcode.com/problems/champagne-tower/
 * @difficulty Medium
 * @timeComplexity O(queryRow^2)
 * @spaceComplexity O(queryRow)
 *
 * @example
 * champagneTower(2, 1, 1); // 0.5
 */
export const champagneTower = (
	poured: number,
	queryRow: number,
	queryGlass: number,
): number => {
	let row = [poured];
	for (let r = 0; r < queryRow; r++) {
		const next = new Array<number>(r + 2).fill(0);
		for (const [i, amount] of row.entries()) {
			const excess = Math.max(0, amount - 1) / 2;
			next[i] = (next[i] ?? 0) + excess;
			next[i + 1] = (next[i + 1] ?? 0) + excess;
		}
		row = next;
	}
	return Math.min(1, row[queryGlass] ?? 0);
};
