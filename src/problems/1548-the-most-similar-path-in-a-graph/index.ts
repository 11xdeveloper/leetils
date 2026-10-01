/**
 * 1548. The Most Similar Path in a Graph
 *
 * Returns a walk through the graph's cities, as long as `targetPath`, whose
 * city names differ from `targetPath` in as few positions as possible.
 *
 * Dynamic programming over positions and cities: the fewest mismatches for
 * a walk ending at a city is its own mismatch plus the best over its
 * neighbours one step earlier. Back-pointers recover the walk.
 *
 * @see https://leetcode.com/problems/the-most-similar-path-in-a-graph/
 * @difficulty Hard
 * @timeComplexity O(t · (n + m)) for a target of length t
 * @spaceComplexity O(t · n)
 *
 * @example
 * theMostSimilarPathInAGraph(4, [[1, 0], [2, 0], [3, 0], [2, 1], [3, 1], [3, 2]], ["ATL", "PEK", "LAX", "DXB"], ["ABC", "DEF", "GHI"]);
 * // a walk of three cities, e.g. [0, 1, 0]
 */
export const theMostSimilarPathInAGraph = (
	n: number,
	roads: readonly (readonly number[])[],
	names: readonly string[],
	targetPath: readonly string[],
): number[] => {
	const neighbours = Array.from({ length: n }, (): number[] => []);
	for (const [a = 0, b = 0] of roads) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const steps = targetPath.length;
	const mismatch = (step: number, city: number): number =>
		names[city] === targetPath[step] ? 0 : 1;
	let cost = Array.from({ length: n }, (_, city) => mismatch(0, city));
	const from: Int32Array[] = [];
	for (let step = 1; step < steps; step++) {
		const back = new Int32Array(n);
		const next = new Array<number>(n).fill(Infinity);
		for (let city = 0; city < n; city++) {
			for (const previous of neighbours[city] ?? []) {
				if ((cost[previous] ?? Infinity) < (next[city] ?? Infinity)) {
					next[city] = cost[previous] ?? Infinity;
					back[city] = previous;
				}
			}
			next[city] = (next[city] ?? Infinity) + mismatch(step, city);
		}
		from.push(back);
		cost = next;
	}
	let city = cost.indexOf(Math.min(...cost));
	const path = [city];
	for (let step = steps - 2; step >= 0; step--) {
		city = from[step]?.[city] ?? 0;
		path.push(city);
	}
	return path.reverse();
};
