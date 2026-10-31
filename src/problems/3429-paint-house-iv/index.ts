/**
 * 3429. Paint House IV
 *
 * Paint an even number of houses in a row with three colors, `cost[i][c]`
 * each, so that neighbours differ and houses the same distance from the two
 * ends differ. Returns the cheapest total.
 *
 * Paint the mirrored pairs from the outside in, keeping the best cost for
 * each (outer-left colour, outer-right colour) pair; a new pair must differ
 * from each other and from their outer neighbours.
 *
 * @see https://leetcode.com/problems/paint-house-iv/
 * @difficulty Medium
 * @timeComplexity O(81 n)
 * @spaceComplexity O(1)
 *
 * @example
 * paintHouseIV(4, [[3, 5, 7], [6, 2, 9], [4, 8, 1], [7, 3, 5]]); // 9
 */
export const paintHouseIV = (
	n: number,
	cost: readonly (readonly number[])[],
): number => {
	let best = new Float64Array(9).fill(Number.POSITIVE_INFINITY);
	for (let i = 0; i < n / 2; i++) {
		const next = new Float64Array(9).fill(Number.POSITIVE_INFINITY);
		for (let a = 0; a < 3; a++)
			for (let b = 0; b < 3; b++) {
				if (a === b) continue;
				const here = (cost[i]?.[a] ?? 0) + (cost[n - 1 - i]?.[b] ?? 0);
				let previous = i === 0 ? 0 : Number.POSITIVE_INFINITY;
				for (let pa = 0; pa < 3 && i > 0; pa++)
					for (let pb = 0; pb < 3; pb++)
						if (pa !== a && pb !== b)
							previous = Math.min(
								previous,
								best[pa * 3 + pb] ?? Number.POSITIVE_INFINITY,
							);
				next[a * 3 + b] = previous + here;
			}
		best = next;
	}
	return Math.min(...best);
};
