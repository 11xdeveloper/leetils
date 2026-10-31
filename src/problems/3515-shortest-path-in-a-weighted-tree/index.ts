/**
 * 3515. Shortest Path in a Weighted Tree
 *
 * A weighted tree on nodes 1 to n is rooted at 1. Queries `[1, u, v, w]`
 * change an edge's weight and `[2, x]` ask for the distance from the root
 * to x. Returns the answers to the second kind.
 *
 * Changing an edge shifts the distance of every node below it by the same
 * amount, and a subtree is a contiguous range of an Euler tour. So keep a
 * Fenwick tree for range additions and point reads over the tour.
 *
 * @see https://leetcode.com/problems/shortest-path-in-a-weighted-tree/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * shortestPathInAWeightedTree(2, [[1, 2, 7]], [[2, 2], [1, 1, 2, 4], [2, 2]]); // [7, 4]
 */
export const shortestPathInAWeightedTree = (
	n: number,
	edges: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const adjacent: [next: number, weight: number][][] = Array.from(
		{ length: n + 1 },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const parent = new Int32Array(n + 1);
	const weight = new Float64Array(n + 1);
	const enter = new Int32Array(n + 1);
	const leave = new Int32Array(n + 1);
	const depth = new Float64Array(n + 1);
	let clock = 0;
	const stack: [node: number, next: number][] = [[1, 0]];
	parent[1] = 0;
	enter[1] = clock++;
	while (stack.length > 0) {
		const top = stack.at(-1);
		if (!top) break;
		const [node, at] = top;
		const edge = adjacent[node]?.[at];
		if (edge) {
			top[1]++;
			const [child, w] = edge;
			if (child === parent[node]) continue;
			parent[child] = node;
			weight[child] = w;
			depth[child] = (depth[node] ?? 0) + w;
			enter[child] = clock++;
			stack.push([child, 0]);
		} else {
			leave[node] = clock;
			stack.pop();
		}
	}
	const tree = new Float64Array(n + 2);
	const add = (i: number, delta: number): void => {
		for (let j = i + 1; j <= n + 1; j += j & -j)
			tree[j] = (tree[j] ?? 0) + delta;
	};
	const read = (i: number): number => {
		let sum = 0;
		for (let j = i + 1; j > 0; j -= j & -j) sum += tree[j] ?? 0;
		return sum;
	};
	const answers: number[] = [];
	for (const [type = 0, a = 0, b = 0, w = 0] of queries) {
		if (type === 2) {
			answers.push((depth[a] ?? 0) + read(enter[a] ?? 0));
			continue;
		}
		const child = parent[a] === b ? a : b;
		const delta = w - (weight[child] ?? 0);
		weight[child] = w;
		add(enter[child] ?? 0, delta);
		add(leave[child] ?? 0, -delta);
	}
	return answers;
};
