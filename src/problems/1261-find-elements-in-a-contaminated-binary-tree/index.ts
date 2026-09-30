import type { TreeNode } from "../../structures/tree-node";

/**
 * 1261. Find Elements in a Contaminated Binary Tree
 *
 * A tree whose root is 0 and whose left and right children of `x` are
 * `2x + 1` and `2x + 2` has had every value replaced by -1. The constructor
 * takes that tree, and `find(target)` returns whether `target` was in it.
 *
 * Works out the original values top-down with an explicit stack and keeps
 * them in a set. The tree itself is left as it is.
 *
 * @see https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n) to build, O(1) per find
 * @spaceComplexity O(n)
 *
 * @example
 * const elements = new FindElementsInAContaminatedBinaryTree(treeFromArray([-1, null, -1]));
 * elements.find(1); // false
 * elements.find(2); // true
 */
export class FindElementsInAContaminatedBinaryTree {
	readonly #values = new Set<number>();

	constructor(root: TreeNode | null) {
		const stack: [TreeNode, number][] = root ? [[root, 0]] : [];
		for (let item = stack.pop(); item; item = stack.pop()) {
			const [node, value] = item;
			this.#values.add(value);
			if (node.left) stack.push([node.left, 2 * value + 1]);
			if (node.right) stack.push([node.right, 2 * value + 2]);
		}
	}

	find(target: number): boolean {
		return this.#values.has(target);
	}
}
