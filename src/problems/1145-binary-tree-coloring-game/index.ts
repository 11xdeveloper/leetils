import type { TreeNode } from "../../structures/tree-node";

/**
 * 1145. Binary Tree Coloring Game
 *
 * On a tree of `n` nodes (odd) valued `1 … n`, the first player colours node
 * `x` and the second then colours some other node `y`. They take turns
 * colouring an uncoloured neighbour of one of their nodes, and whoever
 * colours more nodes wins. Returns whether the second player can pick a `y`
 * that guarantees a win.
 *
 * Node `x` splits the rest of the tree into up to three regions: its left
 * subtree, its right subtree and everything above it. Choosing `y` next to
 * `x` claims a whole region (the first player can't get past `y`), and no
 * other choice does better. So the second player wins if some region holds
 * more than half the nodes.
 *
 * @see https://leetcode.com/problems/binary-tree-coloring-game/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * binaryTreeColoringGame(treeFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), 11, 3); // true
 */
export const binaryTreeColoringGame = (
	root: TreeNode | null,
	n: number,
	x: number,
): boolean => {
	const size = (node: TreeNode | null): number => {
		let count = 0;
		const stack = node ? [node] : [];
		for (let current = stack.pop(); current; current = stack.pop()) {
			count++;
			if (current.left) stack.push(current.left);
			if (current.right) stack.push(current.right);
		}
		return count;
	};
	const stack = root ? [root] : [];
	for (let node = stack.pop(); node; node = stack.pop()) {
		if (node.val !== x) {
			if (node.left) stack.push(node.left);
			if (node.right) stack.push(node.right);
			continue;
		}
		const [left, right] = [size(node.left), size(node.right)];
		const above = n - 1 - left - right;
		return Math.max(left, right, above) * 2 > n;
	}
	return false;
};
