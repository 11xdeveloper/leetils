/**
 * 1443. Minimum Time to Collect All Apples in a Tree
 *
 * Walking an edge takes a second. Returns the least time to start at
 * vertex 0, collect every apple (`hasApple[v]`) and come back.
 *
 * An edge must be walked (twice) exactly when the subtree below it holds an
 * apple. Orders the vertices breadth-first from 0, then works upwards
 * marking which subtrees contain apples.
 *
 * @see https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeToCollectAllApplesInATree(7, [[0, 1], [0, 2], [1, 4], [1, 5], [2, 3], [2, 6]], [false, false, true, false, true, true, false]); // 8
 */
export const minimumTimeToCollectAllApplesInATree = (
	n: number,
	edges: readonly (readonly number[])[],
	hasApple: readonly boolean[],
): number => {
	const neighbours = Array.from({ length: n }, (): number[] => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const parent = new Int32Array(n).fill(-1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const vertex = order[i] ?? 0;
		for (const next of neighbours[vertex] ?? []) {
			if (next === 0 || parent[next] !== -1) continue;
			parent[next] = vertex;
			order.push(next);
		}
	}
	const needed = hasApple.map((apple) => apple);
	let time = 0;
	for (let i = order.length - 1; i > 0; i--) {
		const vertex = order[i] ?? 0;
		if (!needed[vertex]) continue;
		time += 2;
		needed[parent[vertex] ?? 0] = true;
	}
	return time;
};
