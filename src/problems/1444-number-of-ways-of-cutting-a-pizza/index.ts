/**
 * 1444. Number of Ways of Cutting a Pizza
 *
 * Cuts the pizza `k − 1` times, each cut horizontal (giving away the top)
 * or vertical (giving away the left), so every piece has an apple (`A`).
 * Returns the number of ways, modulo 10^9 + 7.
 *
 * The remaining piece is always a bottom-right corner `(r, c)`. Suffix
 * counts of apples tell whether any rectangle has one. `ways[p][r][c]`
 * counts the ways to cut the corner into `p` pieces, trying every cut that
 * gives away a piece with an apple.
 *
 * @see https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza/
 * @difficulty Hard
 * @timeComplexity O(k · rows · cols · (rows + cols))
 * @spaceComplexity O(rows · cols)
 *
 * @example
 * numberOfWaysOfCuttingAPizza(["A..", "AAA", "..."], 3); // 3
 */
export const numberOfWaysOfCuttingAPizza = (
	pizza: readonly string[],
	k: number,
): number => {
	const MOD = 1_000_000_007;
	const rows = pizza.length;
	const cols = pizza[0]?.length ?? 0;
	// apples[r][c] counts the apples in the corner starting at (r, c).
	const apples = Array.from({ length: rows + 1 }, () =>
		new Array<number>(cols + 1).fill(0),
	);
	const at = (r: number, c: number) => apples[r]?.[c] ?? 0;
	for (let r = rows - 1; r >= 0; r--) {
		const row = apples[r] ?? [];
		for (let c = cols - 1; c >= 0; c--) {
			row[c] =
				(pizza[r]?.[c] === "A" ? 1 : 0) +
				at(r + 1, c) +
				at(r, c + 1) -
				at(r + 1, c + 1);
		}
	}
	let ways = Array.from({ length: rows }, (_, r) =>
		Array.from({ length: cols }, (_, c): number => (at(r, c) > 0 ? 1 : 0)),
	);
	for (let pieces = 2; pieces <= k; pieces++) {
		const next = Array.from({ length: rows }, () =>
			new Array<number>(cols).fill(0),
		);
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				let total = 0;
				for (let cut = r + 1; cut < rows; cut++) {
					if (at(r, c) - at(cut, c) > 0) total += ways[cut]?.[c] ?? 0;
				}
				for (let cut = c + 1; cut < cols; cut++) {
					if (at(r, c) - at(r, cut) > 0) total += ways[r]?.[cut] ?? 0;
				}
				const row = next[r];
				if (row) row[c] = total % MOD;
			}
		}
		ways = next;
	}
	return ways[0]?.[0] ?? 0;
};
