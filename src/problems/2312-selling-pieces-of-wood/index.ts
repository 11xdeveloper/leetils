/**
 * 2312. Selling Pieces of Wood
 *
 * Cuts an `m × n` piece of wood across its full height or width any
 * number of times, selling pieces with a price `[h, w, price]`. Returns
 * the most money possible.
 *
 * `best[h][w]` is the better of selling the piece whole or making one cut
 * and selling both halves optimally.
 *
 * @see https://leetcode.com/problems/selling-pieces-of-wood/
 * @difficulty Hard
 * @timeComplexity O(m · n · (m + n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * sellingPiecesOfWood(3, 5, [[1, 4, 2], [2, 2, 7], [2, 1, 3]]); // 19
 */
export const sellingPiecesOfWood = (
	m: number,
	n: number,
	prices: readonly (readonly number[])[],
): number => {
	const best = Array.from({ length: m + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	for (const [h = 0, w = 0, price = 0] of prices)
		(best[h] ?? [])[w] = Math.max(best[h]?.[w] ?? 0, price);
	for (let h = 1; h <= m; h++) {
		const row = best[h] ?? [];
		for (let w = 1; w <= n; w++) {
			let value = row[w] ?? 0;
			for (let cut = 1; cut <= h / 2; cut++)
				value = Math.max(
					value,
					(best[cut]?.[w] ?? 0) + (best[h - cut]?.[w] ?? 0),
				);
			for (let cut = 1; cut <= w / 2; cut++)
				value = Math.max(value, (row[cut] ?? 0) + (row[w - cut] ?? 0));
			row[w] = value;
		}
	}
	return best[m]?.[n] ?? 0;
};
