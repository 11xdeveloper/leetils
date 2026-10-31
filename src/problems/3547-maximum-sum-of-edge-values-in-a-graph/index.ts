/**
 * 3547. Maximum Sum of Edge Values in a Graph
 *
 * In a graph where every component is a path or a cycle, assign the values
 * 1 to n to the nodes to maximise the sum, over edges, of the product of
 * their endpoints' values.
 *
 * Give bigger components bigger values (cycles before paths of the same
 * size, since they have one more edge). Within a component, place its
 * values zigzagging out from the largest in the middle, which pairs large
 * values with large ones.
 *
 * @see https://leetcode.com/problems/maximum-sum-of-edge-values-in-a-graph/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumSumOfEdgeValuesInAGraph(4, [[0, 1], [1, 2], [2, 3]]); // 23
 */
export const maximumSumOfEdgeValuesInAGraph = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const seen = new Uint8Array(n);
	const components: [size: number, cycle: boolean][] = [];
	for (let start = 0; start < n; start++) {
		if (seen[start]) continue;
		seen[start] = 1;
		const stack = [start];
		let size = 0;
		let edgeEnds = 0;
		for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
			size++;
			edgeEnds += adjacent[node]?.length ?? 0;
			for (const next of adjacent[node] ?? [])
				if (!seen[next]) {
					seen[next] = 1;
					stack.push(next);
				}
		}
		components.push([size, edgeEnds / 2 === size]);
	}
	components.sort((a, b) => b[0] - a[0] || Number(b[1]) - Number(a[1]));
	let next = n;
	let total = 0;
	for (const [size, cycle] of components) {
		const values = Array.from({ length: size }, () => next--);
		// Zigzag: largest in the middle, then alternate sides outwards.
		const line: number[] = [];
		values.forEach((value, i) => {
			if (i % 2 === 0) line.push(value);
			else line.unshift(value);
		});
		for (let i = 0; i + 1 < line.length; i++)
			total += (line[i] ?? 0) * (line[i + 1] ?? 0);
		if (cycle && size > 2) total += (line[0] ?? 0) * (line.at(-1) ?? 0);
	}
	return total;
};
