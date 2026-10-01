/**
 * 1223. Dice Roll Simulation
 *
 * Counts the sequences of `n` die rolls in which no face `i` comes up more
 * than `rollMax[i − 1]` times in a row, modulo 10^9 + 7.
 *
 * Dynamic programming over the last face and how many times in a row it has
 * come up: a roll either repeats the last face (extending its run, within
 * the limit) or starts a run of a different face.
 *
 * @see https://leetcode.com/problems/dice-roll-simulation/
 * @difficulty Hard
 * @timeComplexity O(n · 6 · r) for runs up to r = max(rollMax)
 * @spaceComplexity O(6 · r)
 *
 * @example
 * diceRollSimulation(2, [1, 1, 2, 2, 2, 3]); // 34
 */
export const diceRollSimulation = (
	n: number,
	rollMax: readonly number[],
): number => {
	const MOD = 1_000_000_007;
	// ending[face][run - 1] counts sequences ending in `run` copies of `face`.
	let ending = rollMax.map((limit) => {
		const runs = new Array<number>(limit).fill(0);
		runs[0] = 1;
		return runs;
	});
	for (let roll = 1; roll < n; roll++) {
		const totals = ending.map((runs) =>
			runs.reduce((sum, count) => (sum + count) % MOD, 0),
		);
		const all = totals.reduce((sum, total) => (sum + total) % MOD, 0);
		ending = ending.map((runs, face) => {
			const next = new Array<number>(runs.length).fill(0);
			next[0] = (all - (totals[face] ?? 0) + MOD) % MOD;
			for (let run = 1; run < runs.length; run++)
				next[run] = runs[run - 1] ?? 0;
			return next;
		});
	}
	return ending.flat().reduce((sum, count) => (sum + count) % MOD, 0);
};
