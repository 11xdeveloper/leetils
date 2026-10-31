/**
 * 3203. Find Minimum Diameter After Merging Two Trees
 *
 * Join two trees with one edge so the result's diameter is as small as
 * possible. Returns that diameter.
 *
 * Joining the trees' centres gives ⌈d₁ / 2⌉ + ⌈d₂ / 2⌉ + 1, unless one tree's
 * own diameter is bigger. Each diameter comes from two breadth-first
 * searches: the farthest node from anywhere is one end of a diameter.
 *
 * @see https://leetcode.com/problems/find-minimum-diameter-after-merging-two-trees/
 * @difficulty Hard
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * findMinimumDiameterAfterMergingTwoTrees([[0, 1], [0, 2], [0, 3]], [[0, 1]]); // 3
 */
export const findMinimumDiameterAfterMergingTwoTrees = (
	edges1: readonly (readonly number[])[],
	edges2: readonly (readonly number[])[],
): number => {
	const diameter = (edges: readonly (readonly number[])[]): number => {
		const n = edges.length + 1;
		const adjacent: number[][] = Array.from({ length: n }, () => []);
		for (const [u = 0, v = 0] of edges) {
			adjacent[u]?.push(v);
			adjacent[v]?.push(u);
		}
		const farthest = (start: number): [node: number, distance: number] => {
			const distance = new Int32Array(n).fill(-1);
			distance[start] = 0;
			const queue = [start];
			let last = start;
			for (let i = 0; i < queue.length; i++) {
				const node = queue[i] ?? 0;
				last = node;
				for (const next of adjacent[node] ?? [])
					if (distance[next] === -1) {
						distance[next] = (distance[node] ?? 0) + 1;
						queue.push(next);
					}
			}
			return [last, distance[last] ?? 0];
		};
		return farthest(farthest(0)[0])[1];
	};
	const d1 = diameter(edges1);
	const d2 = diameter(edges2);
	return Math.max(d1, d2, Math.ceil(d1 / 2) + Math.ceil(d2 / 2) + 1);
};
