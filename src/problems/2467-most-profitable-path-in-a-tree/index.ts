/**
 * 2467. Most Profitable Path in a Tree
 *
 * Alice walks from node 0 to a leaf while Bob walks from `bob` to node 0,
 * one edge per second. Each gate's `amount` (a cost if negative, a reward
 * if positive) goes to whoever opens it first, or is split if they arrive
 * together. Returns Alice's best net income.
 *
 * Bob's path is fixed: record when he reaches each node on it. Then walk
 * Alice's paths from the root, adding each gate's share.
 *
 * @see https://leetcode.com/problems/most-profitable-path-in-a-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * mostProfitablePathInATree([[0, 1], [1, 2], [1, 3], [3, 4]], 3, [-2, 4, 2, -4, 6]); // 6
 */
export const mostProfitablePathInATree = (
	edges: readonly (readonly number[])[],
	bob: number,
	amount: readonly number[],
): number => {
	const n = amount.length;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = new Array<number>(n).fill(-1);
	const depth = new Array<number>(n).fill(0);
	const order = [0];
	for (let head = 0; head < order.length; head++) {
		const node = order[head] ?? 0;
		for (const next of neighbours[node] ?? []) {
			if (next === parent[node]) continue;
			parent[next] = node;
			depth[next] = (depth[node] ?? 0) + 1;
			order.push(next);
		}
	}
	const bobTime = new Array<number>(n).fill(Infinity);
	for (
		let [node, time] = [bob, 0];
		node !== -1;
		[node, time] = [parent[node] ?? -1, time + 1]
	)
		bobTime[node] = time;

	const income = new Array<number>(n).fill(0);
	let best = -Infinity;
	for (const node of order) {
		const [aliceTime, bobAt] = [depth[node] ?? 0, bobTime[node] ?? Infinity];
		const gate = amount[node] ?? 0;
		const share = aliceTime < bobAt ? gate : aliceTime === bobAt ? gate / 2 : 0;
		income[node] = (node === 0 ? 0 : (income[parent[node] ?? 0] ?? 0)) + share;
		const isLeaf = (neighbours[node] ?? []).every(
			(next) => next === parent[node],
		);
		if (isLeaf) best = Math.max(best, income[node] ?? 0);
	}
	return best;
};
