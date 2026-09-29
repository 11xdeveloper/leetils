import type { TreeNode } from "../../structures/tree-node";

/**
 * 173. Binary Search Tree Iterator
 *
 * Iterates over a binary search tree's values in ascending order (an
 * inorder traversal), one value per call to `next`.
 *
 * Keeps a stack of the nodes on the path to the next value, instead of
 * collecting every value up front. Each node is pushed and popped once, so
 * `next` takes O(1) time on average and the stack holds at most the tree's
 * height.
 *
 * @see https://leetcode.com/problems/binary-search-tree-iterator/
 * @difficulty Medium
 * @timeComplexity O(1) on average per call
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * const iterator = new BinarySearchTreeIterator(treeFromArray([7, 3, 15, null, null, 9, 20]));
 * iterator.next(); // 3
 * iterator.next(); // 7
 * iterator.hasNext(); // true
 */
export class BinarySearchTreeIterator {
	readonly #stack: TreeNode[] = [];

	constructor(root: TreeNode | null) {
		this.#pushLeftPath(root);
	}

	/** Returns the next value. There must be one. */
	next(): number {
		const node = this.#stack.pop();
		if (!node) return 0;
		this.#pushLeftPath(node.right);
		return node.val;
	}

	hasNext(): boolean {
		return this.#stack.length > 0;
	}

	#pushLeftPath(start: TreeNode | null): void {
		for (let node = start; node; node = node.left) this.#stack.push(node);
	}
}
