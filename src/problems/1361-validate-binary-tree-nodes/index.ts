/**
 * 1361. Validate Binary Tree Nodes
 *
 * Nodes `0 … n − 1` have children `leftChild[i]` and `rightChild[i]` (-1 for
 * none). Returns whether they form exactly one binary tree.
 *
 * A tree has exactly one node without a parent, every other node has one
 * parent, and everything is reachable from the root. Counting parents and
 * then searching from the root checks all three.
 *
 * @see https://leetcode.com/problems/validate-binary-tree-nodes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1]); // true
 */
export const validateBinaryTreeNodes = (
	n: number,
	leftChild: readonly number[],
	rightChild: readonly number[],
): boolean => {
	const parents = new Array<number>(n).fill(0);
	for (const child of [...leftChild, ...rightChild]) {
		if (child === -1) continue;
		parents[child] = (parents[child] ?? 0) + 1;
		if ((parents[child] ?? 0) > 1) return false;
	}
	const roots = parents.flatMap((count, node) => (count === 0 ? [node] : []));
	if (roots.length !== 1) return false;
	let visited = 0;
	const stack = [roots[0] ?? 0];
	for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
		visited++;
		for (const child of [leftChild[node] ?? -1, rightChild[node] ?? -1]) {
			if (child !== -1) stack.push(child);
		}
	}
	return visited === n;
};
