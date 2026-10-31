/**
 * 2045. Second Minimum Time to Reach Destination
 *
 * Crossing an edge takes `time` minutes, and every node's signal turns
 * green and red every `change` minutes, starting green; you may only leave
 * on green. Returns the second smallest distinct time to get from vertex 1
 * to vertex `n`.
 *
 * Every edge costs the same, so arrival times grow with the number of
 * edges taken. Breadth-first search finds the two smallest distinct path
 * lengths to each node, then the second one for `n` is timed out.
 *
 * @see https://leetcode.com/problems/second-minimum-time-to-reach-destination/
 * @difficulty Hard
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * secondMinimumTimeToReachDestination(5, [[1, 2], [1, 3], [1, 4], [3, 4], [4, 5]], 3, 5); // 13
 */
export const secondMinimumTimeToReachDestination = (
	n: number,
	edges: readonly (readonly number[])[],
	time: number,
	change: number,
): number => {
	const neighbours: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const first = new Array<number>(n + 1).fill(Infinity);
	const second = new Array<number>(n + 1).fill(Infinity);
	first[1] = 0;
	const queue: [node: number, length: number][] = [[1, 0]];
	for (let head = 0; head < queue.length; head++) {
		const [node, length] = queue[head] ?? [0, 0];
		for (const next of neighbours[node] ?? []) {
			const reached = length + 1;
			if (reached < (first[next] ?? 0)) {
				first[next] = reached;
				queue.push([next, reached]);
			} else if (
				reached > (first[next] ?? 0) &&
				reached < (second[next] ?? 0)
			) {
				second[next] = reached;
				queue.push([next, reached]);
			}
		}
	}

	let elapsed = 0;
	for (let step = 0; step < (second[n] ?? 0); step++) {
		const phase = Math.floor(elapsed / change);
		if (phase % 2) elapsed = (phase + 1) * change;
		elapsed += time;
	}
	return elapsed;
};
