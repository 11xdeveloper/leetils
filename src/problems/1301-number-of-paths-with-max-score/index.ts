/**
 * 1301. Number of Paths with Max Score
 *
 * On a square `board`, moving up, left or diagonally up-left from `S`
 * (bottom-right) to `E` (top-left) and avoiding `X`s, returns the largest
 * sum of digits collected and how many paths achieve it (modulo
 * 10^9 + 7), or `[0, 0]` if `E` can't be reached.
 *
 * Dynamic programming from `S`: each cell takes the best score among the
 * three cells it can be reached from, adding up the path counts of those
 * that tie for it.
 *
 * @see https://leetcode.com/problems/number-of-paths-with-max-score/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * numberOfPathsWithMaxScore(["E12", "1X1", "21S"]); // [4, 2]
 */
export const numberOfPathsWithMaxScore = (
	board: readonly string[],
): number[] => {
	const MOD = 1_000_000_007;
	const n = board.length;
	const score = Array.from({ length: n + 1 }, () =>
		new Array<number>(n + 1).fill(-1),
	);
	const paths = Array.from({ length: n + 1 }, () =>
		new Array<number>(n + 1).fill(0),
	);
	for (let r = n - 1; r >= 0; r--) {
		for (let c = n - 1; c >= 0; c--) {
			const char = board[r]?.[c] ?? "X";
			if (char === "X") continue;
			const [scoreRow, pathRow] = [score[r] ?? [], paths[r] ?? []];
			if (char === "S") {
				scoreRow[c] = 0;
				pathRow[c] = 1;
				continue;
			}
			let [best, ways] = [-1, 0];
			for (const [r2, c2] of [
				[r + 1, c],
				[r, c + 1],
				[r + 1, c + 1],
			] as const) {
				const [s, p] = [score[r2]?.[c2] ?? -1, paths[r2]?.[c2] ?? 0];
				if (s < 0 || p === 0) continue;
				if (s > best) [best, ways] = [s, p];
				else if (s === best) ways = (ways + p) % MOD;
			}
			if (best < 0) continue;
			scoreRow[c] = best + (char === "E" ? 0 : Number(char));
			pathRow[c] = ways;
		}
	}
	const ways = paths[0]?.[0] ?? 0;
	return ways === 0 ? [0, 0] : [score[0]?.[0] ?? 0, ways];
};
