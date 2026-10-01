/**
 * 1059. All Paths from Source Lead to Destination
 *
 * Returns whether every path from `source` in the directed graph ends at
 * `destination`: every dead end reachable from `source` is `destination`,
 * and there's no reachable cycle (which would allow endless paths).
 *
 * Depth-first search with three states per node (unseen, on the current
 * path, finished), using an explicit stack. Reaching a node on the current
 * path is a cycle; reaching a dead end other than the destination fails.
 *
 * @see https://leetcode.com/problems/all-paths-from-source-lead-to-destination/
 * @difficulty Medium
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * allPathsFromSourceLeadToDestination(4, [[0, 1], [0, 2], [1, 3], [2, 3]], 0, 3); // true
 */
export const allPathsFromSourceLeadToDestination = (
	n: number,
	edges: readonly (readonly number[])[],
	source: number,
	destination: number,
): boolean => {
	const next: number[][] = Array.from({ length: n }, () => []);
	for (const [from = 0, to = 0] of edges) next[from]?.push(to);

	const ON_PATH = 1;
	const DONE = 2;
	const state = new Uint8Array(n);
	const stack: [node: number, edge: number][] = [[source, 0]];
	state[source] = ON_PATH;
	while (stack.length > 0) {
		const top = stack.at(-1);
		if (!top) break;
		const [node, edge] = top;
		const successors = next[node] ?? [];
		if (successors.length === 0 && node !== destination) return false;
		if (edge === successors.length) {
			state[node] = DONE;
			stack.pop();
			continue;
		}
		top[1]++;
		const child = successors[edge] ?? 0;
		if (state[child] === ON_PATH) return false;
		if (state[child] === DONE) continue;
		state[child] = ON_PATH;
		stack.push([child, 0]);
	}
	return true;
};
