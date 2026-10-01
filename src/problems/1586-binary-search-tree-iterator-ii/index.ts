import type { TreeNode } from "../../structures/tree-node";

/**
 * 1586. Binary Search Tree Iterator II
 *
 * Steps through a binary search tree's values in order, forwards with
 * `next` and backwards with `prev`, starting before the smallest value.
 *
 * Values are produced lazily with the usual in-order stack and remembered
 * in a list, so stepping back (and forward again over seen values) is just
 * moving an index.
 *
 * @see https://leetcode.com/problems/binary-search-tree-iterator-ii/
 * @difficulty Medium
 * @timeComplexity O(1) amortised per call
 * @spaceComplexity O(n)
 *
 * @example
 * const iterator = new BinarySearchTreeIteratorII(treeFromArray([7, 3, 15, null, null, 9, 20]));
 * iterator.next(); // 3
 * iterator.next(); // 7
 * iterator.prev(); // 3
 */
export class BinarySearchTreeIteratorII {
	readonly #stack: TreeNode[] = [];
	readonly #seen: number[] = [];
	#index = -1;

	constructor(root: TreeNode | null) {
		this.#pushLeft(root);
	}

	hasNext(): boolean {
		return this.#index + 1 < this.#seen.length || this.#stack.length > 0;
	}

	next(): number {
		this.#index++;
		if (this.#index === this.#seen.length) {
			const node = this.#stack.pop();
			if (node) {
				this.#seen.push(node.val);
				this.#pushLeft(node.right);
			}
		}
		return this.#seen[this.#index] ?? 0;
	}

	hasPrev(): boolean {
		return this.#index > 0;
	}

	prev(): number {
		this.#index--;
		return this.#seen[this.#index] ?? 0;
	}

	#pushLeft(node: TreeNode | null): void {
		for (let at = node; at; at = at.left) this.#stack.push(at);
	}
}
