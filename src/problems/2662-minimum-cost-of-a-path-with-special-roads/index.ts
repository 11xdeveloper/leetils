/**
 * 2662. Minimum Cost of a Path With Special Roads
 *
 * Moving between two points costs their Manhattan distance, but each
 * special road `[x1, y1, x2, y2, cost]` leads one way from its start to
 * its end for `cost`. Returns the cheapest trip from `start` to `target`.
 *
 * Only the road ends matter as stops. Run dense Dijkstra over them,
 * walking directly between points or to a road's start and taking it.
 *
 * @see https://leetcode.com/problems/minimum-cost-of-a-path-with-special-roads/
 * @difficulty Medium
 * @timeComplexity O(r²)
 * @spaceComplexity O(r)
 *
 * @example
 * minimumCostOfAPathWithSpecialRoads([1, 1], [4, 5], [[1, 2, 3, 3, 2], [3, 4, 4, 5, 1]]); // 5
 */
export const minimumCostOfAPathWithSpecialRoads = (
	start: readonly number[],
	target: readonly number[],
	specialRoads: readonly (readonly number[])[],
): number => {
	const [sx = 0, sy = 0] = start;
	const [tx = 0, ty = 0] = target;
	const walk = (x1: number, y1: number, x2: number, y2: number): number =>
		Math.abs(x1 - x2) + Math.abs(y1 - y2);

	// best[i]: the cheapest cost to stand at the end of road i.
	const best = specialRoads.map(([x1 = 0, y1 = 0, x2 = 0, y2 = 0, cost = 0]) =>
		Math.min(walk(sx, sy, x1, y1) + cost, walk(sx, sy, x2, y2)),
	);
	const done = specialRoads.map(() => false);
	let answer = walk(sx, sy, tx, ty);
	for (;;) {
		let current = -1;
		for (let i = 0; i < best.length; i++)
			if (!done[i] && (current === -1 || (best[i] ?? 0) < (best[current] ?? 0)))
				current = i;
		if (current === -1) break;
		done[current] = true;
		const here = best[current] ?? 0;
		const [, , cx = 0, cy = 0] = specialRoads[current] ?? [];
		answer = Math.min(answer, here + walk(cx, cy, tx, ty));
		for (const [
			i,
			[x1 = 0, y1 = 0, x2 = 0, y2 = 0, cost = 0],
		] of specialRoads.entries())
			if (!done[i])
				best[i] = Math.min(
					best[i] ?? 0,
					here + walk(cx, cy, x1, y1) + cost,
					here + walk(cx, cy, x2, y2),
				);
	}
	return answer;
};
