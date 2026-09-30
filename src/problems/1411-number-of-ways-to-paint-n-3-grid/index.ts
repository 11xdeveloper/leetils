/**
 * 1411. Number of Ways to Paint N × 3 Grid
 *
 * Counts the colourings of an `n × 3` grid with three colours where no two
 * neighbouring cells match, modulo 10^9 + 7.
 *
 * A valid row is either two-coloured like ABA (6 of them) or three-coloured
 * like ABC (6). Below an ABA row there are 3 ABA and 2 ABC rows that fit,
 * and below an ABC row 2 of each, so two counts carry the whole recurrence.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfWaysToPaintN3Grid(1); // 12
 */
export const numberOfWaysToPaintN3Grid = (n: number): number => {
	const MOD = 1_000_000_007;
	let [twoColour, threeColour] = [6, 6];
	for (let row = 1; row < n; row++) {
		[twoColour, threeColour] = [
			(3 * twoColour + 2 * threeColour) % MOD,
			(2 * twoColour + 2 * threeColour) % MOD,
		];
	}
	return (twoColour + threeColour) % MOD;
};
