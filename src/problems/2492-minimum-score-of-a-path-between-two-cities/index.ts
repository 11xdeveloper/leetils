/**
 * 2492. Minimum Score of a Path Between Two Cities
 *
 * A path's score is its smallest road distance; paths may revisit cities
 * and roads. Returns the lowest score of a path between cities 1 and `n`.
 *
 * Any road connected to city 1 can be detoured through, so take the
 * shortest road in city 1's component.
 *
 * @see https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/
 * @difficulty Medium
 * @timeComplexity O(n + r)
 * @spaceComplexity O(n + r)
 *
 * @example
 * minimumScoreOfAPathBetweenTwoCities(4, [[1, 2, 9], [2, 3, 6], [2, 4, 5], [1, 4, 7]]); // 5
 */
export const minimumScoreOfAPathBetweenTwoCities = (
	n: number,
	roads: readonly (readonly number[])[],
): number => {
	const neighbours: [number, number][][] = Array.from(
		{ length: n + 1 },
		() => [],
	);
	for (const [a = 0, b = 0, distance = 0] of roads) {
		neighbours[a]?.push([b, distance]);
		neighbours[b]?.push([a, distance]);
	}
	const seen = new Uint8Array(n + 1);
	seen[1] = 1;
	let best = Infinity;
	const stack = [1];
	for (let city = stack.pop(); city !== undefined; city = stack.pop()) {
		for (const [next, distance] of neighbours[city] ?? []) {
			best = Math.min(best, distance);
			if (seen[next]) continue;
			seen[next] = 1;
			stack.push(next);
		}
	}
	return best;
};
