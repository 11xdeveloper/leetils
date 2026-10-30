/**
 * 2209. Minimum White Tiles After Covering With Carpets
 *
 * Covers the floor (white tiles "1", black "0") with `numCarpets` carpets
 * of length `carpetLen`. Returns the fewest white tiles left visible.
 *
 * `visible[j][i]` is the fewest visible white tiles among the first `i`
 * with `j` carpets: leave tile `i - 1` uncovered, or end a carpet there.
 *
 * @see https://leetcode.com/problems/minimum-white-tiles-after-covering-with-carpets/
 * @difficulty Hard
 * @timeComplexity O(n · numCarpets)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumWhiteTilesAfterCoveringWithCarpets("10110101", 2, 2); // 2
 */
export const minimumWhiteTilesAfterCoveringWithCarpets = (
	floor: string,
	numCarpets: number,
	carpetLen: number,
): number => {
	const n = floor.length;
	let previous = new Array<number>(n + 1).fill(0);
	for (let i = 1; i <= n; i++)
		previous[i] = (previous[i - 1] ?? 0) + (floor[i - 1] === "1" ? 1 : 0);
	for (let carpets = 1; carpets <= numCarpets; carpets++) {
		const current = new Array<number>(n + 1).fill(0);
		for (let i = 1; i <= n; i++) {
			current[i] = Math.min(
				(current[i - 1] ?? 0) + (floor[i - 1] === "1" ? 1 : 0),
				previous[Math.max(0, i - carpetLen)] ?? 0,
			);
		}
		previous = current;
	}
	return previous[n] ?? 0;
};
