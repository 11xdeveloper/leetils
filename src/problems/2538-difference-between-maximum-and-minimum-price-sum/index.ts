/**
 * 2538. Difference Between Maximum and Minimum Price Sum
 *
 * In a tree with a positive price on each node, rooting it at a node
 * costs the largest price sum of a path starting there minus the smallest,
 * which is just the root's own price. Returns the largest cost over all
 * roots.
 *
 * That is the largest path sum with one endpoint left out. Root the tree
 * at 0 and, for each node, track the best downward path with its far end
 * included and with it excluded; join two children's paths at each node,
 * one of each kind.
 *
 * @see https://leetcode.com/problems/difference-between-maximum-and-minimum-price-sum/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * differenceBetweenMaximumAndMinimumPriceSum(3, [[0, 1], [1, 2]], [1, 1, 1]); // 2
 */
export const differenceBetweenMaximumAndMinimumPriceSum = (
	n: number,
	edges: readonly (readonly number[])[],
	price: readonly number[],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = Array.from({ length: n }, () => -1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of neighbours[node] ?? [])
			if (next !== parent[node]) {
				parent[next] = node;
				order.push(next);
			}
	}

	const withEnd = [...price];
	const withoutEnd = price.map(() => 0);
	let best = 0;
	for (const node of order.toReversed()) {
		const own = price[node] ?? 0;
		let bestWith = own;
		let bestWithout = 0;
		for (const child of neighbours[node] ?? []) {
			if (child === parent[node]) continue;
			const childWith = withEnd[child] ?? 0;
			const childWithout = withoutEnd[child] ?? 0;
			best = Math.max(best, bestWith + childWithout, bestWithout + childWith);
			bestWith = Math.max(bestWith, own + childWith);
			bestWithout = Math.max(bestWithout, own + childWithout);
		}
		withEnd[node] = bestWith;
		withoutEnd[node] = bestWithout;
	}
	return best;
};
