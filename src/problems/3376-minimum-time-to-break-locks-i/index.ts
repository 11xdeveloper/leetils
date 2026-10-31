/**
 * 3376. Minimum Time to Break Locks I
 *
 * A sword's energy starts at 0 and grows by X each minute, with X starting
 * at 1. A lock of strength s breaks once the energy reaches s, which resets
 * the energy to 0 and raises X by `k`. Returns the fewest minutes to break
 * every lock.
 *
 * With j locks already broken, X is 1 + j·k and a lock takes ⌈s / X⌉
 * minutes. Bitmask dynamic programming over which locks are broken.
 *
 * @see https://leetcode.com/problems/minimum-time-to-break-locks-i/
 * @difficulty Medium
 * @timeComplexity O(2ⁿ · n)
 * @spaceComplexity O(2ⁿ)
 *
 * @example
 * minimumTimeToBreakLocksI([3, 4, 1], 1); // 4
 */
export const minimumTimeToBreakLocksI = (
	strength: readonly number[],
	k: number,
): number => {
	const n = strength.length;
	const best = new Float64Array(1 << n).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (let mask = 0; mask < 1 << n; mask++) {
		let broken = 0;
		for (let m = mask; m; m &= m - 1) broken++;
		const factor = 1 + broken * k;
		for (let lock = 0; lock < n; lock++) {
			if ((mask >> lock) & 1) continue;
			const next = mask | (1 << lock);
			best[next] = Math.min(
				best[next] ?? 0,
				(best[mask] ?? 0) + Math.ceil((strength[lock] ?? 0) / factor),
			);
		}
	}
	return best[(1 << n) - 1] ?? 0;
};
