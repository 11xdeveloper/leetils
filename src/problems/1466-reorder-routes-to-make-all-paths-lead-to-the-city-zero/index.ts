/**
 * 1466. Reorder Routes to Make All Paths Lead to the City Zero
 *
 * The one-way roads in `connections` form a tree. Returns the fewest roads
 * to reverse so every city can reach city 0.
 *
 * Every road must point towards 0, so searching outwards from 0, count the
 * roads found pointing away from it.
 *
 * @see https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reorderRoutesToMakeAllPathsLeadToTheCityZero(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]); // 3
 */
export const reorderRoutesToMakeAllPathsLeadToTheCityZero = (
	n: number,
	connections: readonly (readonly number[])[],
): number => {
	// Each entry: [neighbour, 1 if the road points from this city to it].
	const roads = Array.from({ length: n }, (): [number, number][] => []);
	for (const [a = 0, b = 0] of connections) {
		roads[a]?.push([b, 1]);
		roads[b]?.push([a, 0]);
	}
	const seen = new Uint8Array(n);
	seen[0] = 1;
	const stack = [0];
	let reversed = 0;
	for (let city = stack.pop(); city !== undefined; city = stack.pop()) {
		for (const [next, away] of roads[city] ?? []) {
			if (seen[next]) continue;
			seen[next] = 1;
			reversed += away;
			stack.push(next);
		}
	}
	return reversed;
};
