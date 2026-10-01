/**
 * 956. Tallest Billboard
 *
 * A billboard needs two steel supports of equal height, each welded from
 * some of the `rods` (each used at most once). Returns the tallest possible
 * height, or 0 if it can't be built.
 *
 * DP over the difference between the two supports: `best[d]` is the
 * tallest shorter support achievable with the taller one `d` longer. Each
 * rod goes on the taller side, the shorter side, or neither.
 *
 * @see https://leetcode.com/problems/tallest-billboard/
 * @difficulty Hard
 * @timeComplexity O(n · S) for S the total length of the rods
 * @spaceComplexity O(S)
 *
 * @example
 * tallestBillboard([1, 2, 3, 6]); // 6: 1 + 2 + 3 and 6
 */
export const tallestBillboard = (rods: readonly number[]): number => {
	let best = new Map([[0, 0]]);
	for (const rod of rods) {
		const next = new Map(best);
		const offer = (difference: number, shorter: number): void => {
			if (shorter > (next.get(difference) ?? -1)) next.set(difference, shorter);
		};
		for (const [difference, shorter] of best) {
			offer(difference + rod, shorter);
			if (rod <= difference) offer(difference - rod, shorter + rod);
			else offer(rod - difference, shorter + difference);
		}
		best = next;
	}
	return best.get(0) ?? 0;
};
