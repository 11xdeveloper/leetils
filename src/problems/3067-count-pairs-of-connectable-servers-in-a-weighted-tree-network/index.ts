/**
 * 3067. Count Pairs of Connectable Servers in a Weighted Tree Network
 *
 * For each server c of a weighted tree, count the pairs of other servers a
 * and b in different branches from c whose distances from c are both
 * multiples of `signalSpeed`.
 *
 * From each c, count the qualifying servers in each branch with a
 * depth-first search, and combine branches as you go: each new branch pairs
 * with everything counted before it.
 *
 * @see https://leetcode.com/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * countPairsOfConnectableServersInAWeightedTreeNetwork([[0, 1, 1], [1, 2, 5], [2, 3, 13], [3, 4, 9], [4, 5, 2]], 1);
 * // [0, 4, 6, 6, 4, 0]
 */
export const countPairsOfConnectableServersInAWeightedTreeNetwork = (
	edges: readonly (readonly number[])[],
	signalSpeed: number,
): number[] => {
	const n = edges.length + 1;
	const adjacent: [next: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	const countBranch = (start: number, from: number, weight: number): number => {
		let count = 0;
		const stack: [node: number, parent: number, distance: number][] = [
			[start, from, weight],
		];
		for (let top = stack.pop(); top; top = stack.pop()) {
			const [node, parent, distance] = top;
			if (distance % signalSpeed === 0) count++;
			for (const [next, w] of adjacent[node] ?? [])
				if (next !== parent) stack.push([next, node, distance + w]);
		}
		return count;
	};
	return adjacent.map((neighbours, c) => {
		let pairs = 0;
		let before = 0;
		for (const [next, w] of neighbours) {
			const count = countBranch(next, c, w);
			pairs += before * count;
			before += count;
		}
		return pairs;
	});
};
