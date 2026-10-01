/** Happiness a person of each type starts with (empty, introvert, extrovert). */
const BASE = [0, 120, 40];
/** Change in happiness per neighbour, by person type. */
const PER_NEIGHBOUR = [0, -30, 20];

/**
 * 1659. Maximize Grid Happiness
 *
 * Places up to `introvertsCount` introverts (120, −30 per neighbour) and
 * up to `extrovertsCount` extroverts (40, +20 per neighbour) in an
 * `m × n` grid. Returns the largest total happiness.
 *
 * Fill cells in row-major order. A new person only interacts with the
 * cells to its left and above, both among the last `n` cells, so the state
 * is those `n` cells in base 3 plus the people left: a broken-profile
 * dynamic program, memoised.
 *
 * @see https://leetcode.com/problems/maximize-grid-happiness/
 * @difficulty Hard
 * @timeComplexity O(mn · 3^n · I · E)
 * @spaceComplexity O(mn · 3^n · I · E)
 *
 * @example
 * maximizeGridHappiness(2, 3, 1, 2); // 240
 */
export const maximizeGridHappiness = (
	m: number,
	n: number,
	introvertsCount: number,
	extrovertsCount: number,
): number => {
	const top = 3 ** (n - 1);
	const memo = new Map<number, number>();
	const best = (
		cell: number,
		profile: number,
		introverts: number,
		extroverts: number,
	): number => {
		if (cell === m * n) return 0;
		const key = ((cell * 243 + profile) * 7 + introverts) * 7 + extroverts;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const up = Math.floor(profile / top);
		const left = cell % n === 0 ? 0 : profile % 3;
		const shifted = (profile % top) * 3;
		let result = best(cell + 1, shifted, introverts, extroverts);
		for (const [type, available] of [
			[1, introverts],
			[2, extroverts],
		] as const) {
			if (available === 0) continue;
			let gain = BASE[type] ?? 0;
			for (const neighbour of [up, left]) {
				if (neighbour === 0) continue;
				gain += (PER_NEIGHBOUR[type] ?? 0) + (PER_NEIGHBOUR[neighbour] ?? 0);
			}
			const rest =
				type === 1
					? best(cell + 1, shifted + 1, introverts - 1, extroverts)
					: best(cell + 1, shifted + 2, introverts, extroverts - 1);
			result = Math.max(result, gain + rest);
		}
		memo.set(key, result);
		return result;
	};
	return best(0, 0, introvertsCount, extrovertsCount);
};
