/**
 * 3568. Minimum Moves to Clean the Classroom
 *
 * A student starts at `S` with `energy` and moves up, down, left or right,
 * each step costing 1 energy; `R` cells restore full energy, `X` blocks,
 * and `L` cells hold litter (at most 10). Returns the fewest moves to
 * collect all litter, or -1.
 *
 * Breadth-first search over (cell, litter collected, energy left). Arriving
 * somewhere with the same litter but less energy than before is never
 * better, so keep only the most energy seen per (cell, litter).
 *
 * @see https://leetcode.com/problems/minimum-moves-to-clean-the-classroom/
 * @difficulty Medium
 * @timeComplexity O(m · n · 2^L · energy)
 * @spaceComplexity O(m · n · 2^L)
 *
 * @example
 * minimumMovesToCleanTheClassroom(["S.", "XL"], 2); // 2
 */
export const minimumMovesToCleanTheClassroom = (
	classroom: readonly string[],
	energy: number,
): number => {
	const m = classroom.length;
	const n = classroom[0]?.length ?? 0;
	const litter = new Map<number, number>();
	let start = 0;
	classroom.forEach((row, r) => {
		for (let c = 0; c < n; c++) {
			if (row[c] === "L") litter.set(r * n + c, litter.size);
			if (row[c] === "S") start = r * n + c;
		}
	});
	const full = (1 << litter.size) - 1;
	const most = new Int32Array(m * n * (full + 1)).fill(-1);
	let frontier: [cell: number, mask: number, left: number][] = [
		[start, 0, energy],
	];
	most[start * (full + 1)] = energy;
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: [number, number, number][] = [];
		for (const [cell, mask, left] of frontier) {
			if (mask === full) return moves;
			if (left === 0) continue;
			const [r, c] = [Math.floor(cell / n), cell % n];
			for (const [dr, dc] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			] as const) {
				const [nr, nc] = [r + dr, c + dc];
				const kind = classroom[nr]?.[nc];
				if (kind === undefined || kind === "X") continue;
				const to = nr * n + nc;
				const bit = litter.get(to);
				const newMask = bit === undefined ? mask : mask | (1 << bit);
				const newLeft = kind === "R" ? energy : left - 1;
				const slot = to * (full + 1) + newMask;
				if (newLeft <= (most[slot] ?? -1)) continue;
				most[slot] = newLeft;
				next.push([to, newMask, newLeft]);
			}
		}
		frontier = next;
	}
	return -1;
};
