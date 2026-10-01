/**
 * 1531. String Compression II
 *
 * Run-length encoding writes a run as its letter followed by its length
 * (omitted for runs of one). Returns the shortest encoding of `s` after
 * deleting at most `k` characters.
 *
 * Dynamic programming from the right: `best[i][d]` is the shortest encoding
 * of `s[i …]` with `d` deletions to spend. Either delete `s[i]`, or keep it
 * as the start of a run, extending the run over later copies of its letter
 * and deleting the other letters in between.
 *
 * @see https://leetcode.com/problems/string-compression-ii/
 * @difficulty Hard
 * @timeComplexity O(n^2 · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * stringCompressionII("aaabcccd", 2); // 4
 */
export const stringCompressionII = (s: string, k: number): number => {
	const n = s.length;
	const encoded = (run: number) =>
		run === 1 ? 1 : run < 10 ? 2 : run < 100 ? 3 : 4;
	const best = Array.from({ length: n + 1 }, () =>
		new Array<number>(k + 1).fill(0),
	);
	for (let i = n - 1; i >= 0; i--) {
		const row = best[i] ?? [];
		for (let d = 0; d <= k; d++) {
			let shortest = d > 0 ? (best[i + 1]?.[d - 1] ?? Infinity) : Infinity;
			let [run, deleted] = [0, 0];
			for (let j = i; j < n; j++) {
				if (s[j] === s[i]) run++;
				else deleted++;
				if (deleted > d) break;
				shortest = Math.min(
					shortest,
					encoded(run) + (best[j + 1]?.[d - deleted] ?? 0),
				);
			}
			row[d] = shortest;
		}
	}
	return best[0]?.[k] ?? 0;
};
