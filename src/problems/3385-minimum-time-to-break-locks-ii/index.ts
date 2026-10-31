/**
 * 3385. Minimum Time to Break Locks II
 *
 * A sword's energy starts at 0 and grows by X each minute, with X starting
 * at 1. A lock of strength s breaks once the energy reaches s, which resets
 * the energy to 0 and raises X by 1. Returns the fewest minutes to break
 * every lock, for up to 80 locks.
 *
 * Breaking lock i as the j-th costs ⌈s_i / (j + 1)⌉, independently of the
 * rest, so it's an assignment problem: solve it with the Hungarian
 * algorithm.
 *
 * @see https://leetcode.com/problems/minimum-time-to-break-locks-ii/
 * @difficulty Hard
 * @timeComplexity O(n³)
 * @spaceComplexity O(n²)
 *
 * @example
 * minimumTimeToBreakLocksII([3, 4, 1]); // 4
 */
export const minimumTimeToBreakLocksII = (
	strength: readonly number[],
): number => {
	const n = strength.length;
	const cost = (lock: number, slot: number): number =>
		Math.ceil((strength[lock] ?? 0) / (slot + 1));
	const INF = Number.POSITIVE_INFINITY;
	// Hungarian algorithm with potentials, rows are locks and columns are slots (1-indexed).
	const u = new Float64Array(n + 1);
	const v = new Float64Array(n + 1);
	const match = new Int32Array(n + 1);
	const way = new Int32Array(n + 1);
	for (let row = 1; row <= n; row++) {
		match[0] = row;
		let col = 0;
		const minimum = new Float64Array(n + 1).fill(INF);
		const used = new Uint8Array(n + 1);
		do {
			used[col] = 1;
			const r = match[col] ?? 0;
			let delta = INF;
			let next = 0;
			for (let j = 1; j <= n; j++) {
				if (used[j]) continue;
				const reduced = cost(r - 1, j - 1) - (u[r] ?? 0) - (v[j] ?? 0);
				if (reduced < (minimum[j] ?? INF)) {
					minimum[j] = reduced;
					way[j] = col;
				}
				if ((minimum[j] ?? INF) < delta) {
					delta = minimum[j] ?? INF;
					next = j;
				}
			}
			for (let j = 0; j <= n; j++)
				if (used[j]) {
					u[match[j] ?? 0] = (u[match[j] ?? 0] ?? 0) + delta;
					v[j] = (v[j] ?? 0) - delta;
				} else minimum[j] = (minimum[j] ?? INF) - delta;
			col = next;
		} while (match[col] !== 0);
		do {
			const previous = way[col] ?? 0;
			match[col] = match[previous] ?? 0;
			col = previous;
		} while (col !== 0);
	}
	let total = 0;
	for (let j = 1; j <= n; j++) total += cost((match[j] ?? 1) - 1, j - 1);
	return total;
};
