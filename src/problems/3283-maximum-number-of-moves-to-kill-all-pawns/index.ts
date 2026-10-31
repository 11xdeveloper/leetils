const KNIGHT = [
	[1, 2],
	[2, 1],
	[2, -1],
	[1, -2],
	[-1, -2],
	[-2, -1],
	[-2, 1],
	[-1, 2],
];

/**
 * 3283. Maximum Number of Moves to Kill All Pawns
 *
 * A knight on a 50 × 50 board captures pawns one at a time. Alice and Bob
 * take turns choosing the next pawn, and the knight goes there by a
 * shortest route; Alice wants the total number of moves to be large and Bob
 * small. Returns the total with both playing optimally.
 *
 * Find knight distances from each pawn (and the start) by breadth-first
 * search, then play the game out by minimax over (pawns left, current
 * square), whose turn it is following from how many pawns are gone.
 *
 * @see https://leetcode.com/problems/maximum-number-of-moves-to-kill-all-pawns/
 * @difficulty Hard
 * @timeComplexity O(p · 2500 + 2^p · p²), for p pawns
 * @spaceComplexity O(p · 2500 + 2^p · p)
 *
 * @example
 * maximumNumberOfMovesToKillAllPawns(1, 1, [[0, 0]]); // 4
 */
export const maximumNumberOfMovesToKillAllPawns = (
	kx: number,
	ky: number,
	positions: readonly (readonly number[])[],
): number => {
	const p = positions.length;
	const squares = [
		...positions.map(([x = 0, y = 0]) => [x, y] as const),
		[kx, ky] as const,
	];
	const distance = squares.map(([sx, sy]) => {
		const dist = new Int32Array(2500).fill(-1);
		dist[sx * 50 + sy] = 0;
		const queue = [sx * 50 + sy];
		for (let i = 0; i < queue.length; i++) {
			const cell = queue[i] ?? 0;
			const [x, y] = [Math.floor(cell / 50), cell % 50];
			for (const [dx = 0, dy = 0] of KNIGHT) {
				const [nx, ny] = [x + dx, y + dy];
				if (
					nx < 0 ||
					ny < 0 ||
					nx >= 50 ||
					ny >= 50 ||
					dist[nx * 50 + ny] !== -1
				)
					continue;
				dist[nx * 50 + ny] = (dist[cell] ?? 0) + 1;
				queue.push(nx * 50 + ny);
			}
		}
		return squares.map(([x, y]) => dist[x * 50 + y] ?? 0);
	});
	const full = (1 << p) - 1;
	// best[mask * (p + 1) + at]: moves still to come with `mask` captured, standing on square `at`.
	const best = new Int32Array((1 << p) * (p + 1));
	for (let mask = full - 1; mask >= 0; mask--) {
		let captured = 0;
		for (let m = mask; m; m &= m - 1) captured++;
		const alice = captured % 2 === 0;
		for (let at = 0; at <= p; at++) {
			if (at < p && !((mask >> at) & 1)) continue;
			let value = alice ? -1 : Number.POSITIVE_INFINITY;
			for (let next = 0; next < p; next++) {
				if ((mask >> next) & 1) continue;
				const total =
					(distance[at]?.[next] ?? 0) +
					(best[(mask | (1 << next)) * (p + 1) + next] ?? 0);
				value = alice ? Math.max(value, total) : Math.min(value, total);
			}
			best[mask * (p + 1) + at] = value;
		}
	}
	return best[p] ?? 0;
};
