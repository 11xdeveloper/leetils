/**
 * 1273. Delete Tree Nodes
 *
 * A tree rooted at node 0 has `parent[i]` and `value[i]` for each of its
 * `nodes` nodes. Removes every subtree whose values sum to 0 and returns how
 * many nodes remain.
 *
 * Orders the nodes breadth-first from the root, then goes through them in
 * reverse so each subtree's sum and surviving size are complete before its
 * parent's. A subtree summing to 0 contributes no nodes.
 *
 * @see https://leetcode.com/problems/delete-tree-nodes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * deleteTreeNodes(7, [-1, 0, 0, 1, 2, 2, 2], [1, -2, 4, 0, -2, -1, -2]); // 6
 */
export const deleteTreeNodes = (
	nodes: number,
	parent: readonly number[],
	value: readonly number[],
): number => {
	const children = Array.from({ length: nodes }, (): number[] => []);
	parent.forEach((p, i) => {
		if (p !== -1) children[p]?.push(i);
	});
	const order = [0];
	for (let i = 0; i < order.length; i++)
		order.push(...(children[order[i] ?? 0] ?? []));
	const sum = [...value];
	const size = new Array<number>(nodes).fill(1);
	for (let i = order.length - 1; i >= 0; i--) {
		const node = order[i] ?? 0;
		if (sum[node] === 0) size[node] = 0;
		const p = parent[node] ?? -1;
		if (p === -1) continue;
		sum[p] = (sum[p] ?? 0) + (sum[node] ?? 0);
		size[p] = (size[p] ?? 0) + (size[node] ?? 0);
	}
	return size[0] ?? 0;
};
