/**
 * 4015. Weighted Sum of a Tree
 *
 * A node at depth d (the root at depth 1) weighs its value times
 * (h - d + 1), for the tree's height h. Returns the total weight.
 *
 * Breadth-first search gives each node's depth.
 *
 * @see https://leetcode.com/problems/weighted-sum-of-a-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * weightedSumOfATree([-1, 0, 1, 2], [1, 2, 3, 4]); // 20
 */
export const weightedSumOfATree = (
	parent: readonly number[],
	nums: readonly number[],
): number => {
	const n = parent.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	parent.forEach((p, i) => {
		if (p >= 0) children[p]?.push(i);
	});
	const depth = new Int32Array(n);
	depth[0] = 1;
	const order = [0];
	for (let i = 0; i < order.length; i++)
		for (const child of children[order[i] ?? 0] ?? []) {
			depth[child] = (depth[order[i] ?? 0] ?? 0) + 1;
			order.push(child);
		}
	const height = Math.max(...depth);
	return nums.reduce(
		(total, x, i) => total + x * (height - (depth[i] ?? 0) + 1),
		0,
	);
};
