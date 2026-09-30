/**
 * 1377. Frog Position After T Seconds
 *
 * A frog starts at vertex 1 of a tree and each second jumps to a uniformly
 * random unvisited neighbour, staying put forever once there are none.
 * Returns the probability it's on `target` after `t` seconds.
 *
 * Only the path from 1 to `target` matters. Breadth-first search finds it,
 * multiplying in `1 / choices` at each step. The frog is there at time `t`
 * if it arrives exactly then, or earlier and has nowhere left to go.
 *
 * @see https://leetcode.com/problems/frog-position-after-t-seconds/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * frogPositionAfterTSeconds(7, [[1, 2], [1, 3], [1, 7], [2, 4], [2, 6], [3, 5]], 2, 4); // 0.16666666666666666
 */
export const frogPositionAfterTSeconds = (
	n: number,
	edges: readonly (readonly number[])[],
	t: number,
	target: number,
): number => {
	const neighbours = Array.from({ length: n + 1 }, (): number[] => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const seen = new Uint8Array(n + 1);
	seen[1] = 1;
	// Each entry: a vertex, the chance of reaching it, and the time it's reached.
	const queue: [number, number, number][] = [[1, 1, 0]];
	for (let i = 0; i < queue.length; i++) {
		const [vertex, chance, time] = queue[i] ?? [1, 1, 0];
		const unvisited = (neighbours[vertex] ?? []).filter((next) => !seen[next]);
		if (vertex === target) {
			if (time === t || (time < t && unvisited.length === 0)) return chance;
			return 0;
		}
		for (const next of unvisited) {
			seen[next] = 1;
			queue.push([next, chance / unvisited.length, time + 1]);
		}
	}
	return 0;
};
