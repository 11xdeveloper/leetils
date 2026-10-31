/**
 * 3441. Minimum Cost Good Caption
 *
 * A caption is good if every letter appears in runs of at least three.
 * Changing a letter to the previous or next one in the alphabet costs 1.
 * Returns the cheapest good caption (the lexicographically smallest on a
 * tie), or `""` if there's none.
 *
 * Dynamic programming from the right over (position, previous letter, run
 * length so far capped at 3): continue the run, or start a new letter once
 * the run has reached 3. The best "new letter" option per position is
 * shared by every state, so precompute it. Then rebuild from the left,
 * always taking the smallest letter that stays optimal.
 *
 * @see https://leetcode.com/problems/minimum-cost-good-caption/
 * @difficulty Hard
 * @timeComplexity O(26 n)
 * @spaceComplexity O(26 n)
 *
 * @example
 * minimumCostGoodCaption("cdcd"); // "cccc"
 */
export const minimumCostGoodCaption = (caption: string): string => {
	const n = caption.length;
	if (n < 3) return "";
	const INF = Number.POSITIVE_INFINITY;
	const letter = (i: number): number => caption.charCodeAt(i) - 97;
	// cost[(i * 26 + c) * 3 + k]: cheapest finish for positions i.. with letter c just used, run length k + 1.
	const cost = new Float64Array((n + 1) * 26 * 3).fill(INF);
	const at = (i: number, c: number, k: number): number => (i * 26 + c) * 3 + k;
	for (let c = 0; c < 26; c++) cost[at(n, c, 2)] = 0;
	// fresh[i]: cheapest finish from position i starting a new letter there.
	const fresh = new Float64Array(n + 1).fill(INF);
	for (let i = n - 1; i >= 0; i--) {
		for (let d = 0; d < 26; d++)
			fresh[i] = Math.min(
				fresh[i] ?? INF,
				Math.abs(letter(i) - d) + (cost[at(i + 1, d, 0)] ?? INF),
			);
		for (let c = 0; c < 26; c++)
			for (let k = 0; k < 3; k++) {
				const same =
					Math.abs(letter(i) - c) +
					(cost[at(i + 1, c, Math.min(k + 1, 2))] ?? INF);
				cost[at(i, c, k)] = k === 2 ? Math.min(same, fresh[i] ?? INF) : same;
			}
	}
	if ((fresh[0] ?? INF) === INF) return "";
	const result: number[] = [];
	let run = 0;
	for (let i = 0; i < n; i++) {
		const previous = result.at(-1);
		const target =
			previous === undefined
				? (fresh[0] ?? INF)
				: (cost[at(i, previous, run)] ?? INF);
		for (let d = 0; d < 26; d++) {
			const continues = d === previous;
			if (!continues && previous !== undefined && run < 2) continue;
			const nextRun = continues ? Math.min(run + 1, 2) : 0;
			if (
				Math.abs(letter(i) - d) + (cost[at(i + 1, d, nextRun)] ?? INF) ===
				target
			) {
				result.push(d);
				run = nextRun;
				break;
			}
		}
	}
	return String.fromCharCode(...result.map((c) => 97 + c));
};
