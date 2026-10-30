/**
 * 2872. Maximum Number of K-Divisible Components
 *
 * Removing edges splits the tree into components. Returns the most
 * components possible when each must have a value sum divisible by `k`;
 * the total is guaranteed divisible.
 *
 * Bottom up, cut every subtree whose sum is divisible by `k`; each cut
 * makes a component, and the remainder still divides evenly.
 *
 * @see https://leetcode.com/problems/maximum-number-of-k-divisible-components/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfKDivisibleComponents(5, [[0, 2], [1, 2], [1, 3], [2, 4]], [1, 8, 1, 4, 4], 6); // 2
 */
export const maximumNumberOfKDivisibleComponents = (
	n: number,
	edges: readonly (readonly number[])[],
	values: readonly number[],
	k: number,
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
	const remainder = values.map((v) => v % k);
	let components = 0;
	for (const node of order.toReversed()) {
		if ((remainder[node] ?? 0) === 0) components++;
		const up = parent[node] ?? -1;
		if (up >= 0)
			remainder[up] = ((remainder[up] ?? 0) + (remainder[node] ?? 0)) % k;
	}
	return components;
};
