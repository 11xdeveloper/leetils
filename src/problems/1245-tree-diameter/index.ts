/**
 * 1245. Tree Diameter
 *
 * Returns the number of edges on the longest path in the tree with the
 * given `edges` (nodes `0 … n − 1`, where `n` is one more than the number of
 * edges).
 *
 * Two breadth-first searches: the farthest node from any start is one end
 * of a longest path, and the farthest node from that end is the other.
 *
 * @see https://leetcode.com/problems/tree-diameter/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * treeDiameter([[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]]); // 4
 */
export const treeDiameter = (edges: readonly (readonly number[])[]): number => {
	const n = edges.length + 1;
	const neighbours = Array.from({ length: n }, (): number[] => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const farthest = (start: number): [node: number, distance: number] => {
		const distance = new Int32Array(n).fill(-1);
		distance[start] = 0;
		const queue = [start];
		let last = start;
		for (let i = 0; i < queue.length; i++) {
			last = queue[i] ?? start;
			for (const next of neighbours[last] ?? []) {
				if (distance[next] !== -1) continue;
				distance[next] = (distance[last] ?? 0) + 1;
				queue.push(next);
			}
		}
		return [last, distance[last] ?? 0];
	};
	return farthest(farthest(0)[0])[1];
};
