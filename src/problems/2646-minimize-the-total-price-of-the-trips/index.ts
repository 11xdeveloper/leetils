/**
 * 2646. Minimize the Total Price of the Trips
 *
 * Each trip in a tree costs the sum of node prices along its path. Before
 * the trips you may halve the prices of some nodes, no two adjacent.
 * Returns the smallest total cost of all trips.
 *
 * Count how often each node is used across the trips, then a tree DP
 * chooses, for each node, the cheapest total with it halved (children
 * kept) or kept (children free to choose).
 *
 * @see https://leetcode.com/problems/minimize-the-total-price-of-the-trips/
 * @difficulty Hard
 * @timeComplexity O(n · t)
 * @spaceComplexity O(n)
 *
 * @example
 * minimizeTheTotalPriceOfTheTrips(2, [[0, 1]], [2, 2], [[0, 0]]); // 1
 */
export const minimizeTheTotalPriceOfTheTrips = (
	n: number,
	edges: readonly (readonly number[])[],
	price: readonly number[],
	trips: readonly (readonly number[])[],
): number => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = Array.from({ length: n }, () => -1);
	const depth = Array.from({ length: n }, () => 0);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const next of neighbours[node] ?? [])
			if (next !== parent[node]) {
				parent[next] = node;
				depth[next] = (depth[node] ?? 0) + 1;
				order.push(next);
			}
	}

	const uses = Array.from({ length: n }, () => 0);
	for (let [a = 0, b = 0] of trips) {
		while (a !== b) {
			if ((depth[a] ?? 0) < (depth[b] ?? 0)) [a, b] = [b, a];
			uses[a] = (uses[a] ?? 0) + 1;
			a = parent[a] ?? 0;
		}
		uses[a] = (uses[a] ?? 0) + 1;
	}

	const whole = Array.from({ length: n }, () => 0);
	const halved = Array.from({ length: n }, () => 0);
	for (const node of order.toReversed()) {
		const cost = (price[node] ?? 0) * (uses[node] ?? 0);
		let keep = cost;
		let half = cost / 2;
		for (const child of neighbours[node] ?? []) {
			if (child === parent[node]) continue;
			keep += Math.min(whole[child] ?? 0, halved[child] ?? 0);
			half += whole[child] ?? 0;
		}
		whole[node] = keep;
		halved[node] = half;
	}
	return Math.min(whole[0] ?? 0, halved[0] ?? 0);
};
