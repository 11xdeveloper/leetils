/**
 * 1473. Paint House III
 *
 * `m` houses, some already painted (`houses[i]` > 0), must end up with
 * exactly `target` neighbourhoods (maximal runs of one colour). Painting
 * house `i` colour `j + 1` costs `cost[i][j]`. Returns the least cost, or -1.
 *
 * Dynamic programming over houses: `best[c][t]` is the cheapest way so far
 * with the last house colour `c` and `t` neighbourhoods. A house either
 * continues its predecessor's neighbourhood (same colour) or starts a new
 * one, taking the cheapest predecessor of any other colour.
 *
 * @see https://leetcode.com/problems/paint-house-iii/
 * @difficulty Hard
 * @timeComplexity O(m · n^2 · target)
 * @spaceComplexity O(n · target)
 *
 * @example
 * paintHouseIII([0, 0, 0, 0, 0], [[1, 10], [10, 1], [10, 1], [1, 10], [5, 1]], 5, 2, 3); // 9
 */
export const paintHouseIII = (
	houses: readonly number[],
	cost: readonly (readonly number[])[],
	m: number,
	n: number,
	target: number,
): number => {
	const empty = () =>
		Array.from({ length: n + 1 }, () =>
			new Array<number>(target + 1).fill(Infinity),
		);
	let best = empty();
	for (let i = 0; i < m; i++) {
		const next = empty();
		const painted = houses[i] ?? 0;
		for (let colour = 1; colour <= n; colour++) {
			if (painted !== 0 && painted !== colour) continue;
			const price = painted === 0 ? (cost[i]?.[colour - 1] ?? 0) : 0;
			const row = next[colour] ?? [];
			if (i === 0) {
				row[1] = price;
				continue;
			}
			for (let t = 1; t <= target; t++) {
				let cheapest = best[colour]?.[t] ?? Infinity;
				for (let previous = 1; previous <= n; previous++) {
					if (previous !== colour)
						cheapest = Math.min(cheapest, best[previous]?.[t - 1] ?? Infinity);
				}
				row[t] = cheapest + price;
			}
		}
		best = next;
	}
	const answer = Math.min(...best.map((row) => row[target] ?? Infinity));
	return answer === Infinity ? -1 : answer;
};
