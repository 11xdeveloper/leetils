/**
 * 1483. Kth Ancestor of a Tree Node
 *
 * For the tree given by `parent` (with root 0), answers
 * `getKthAncestor(node, k)`: the ancestor `k` steps up, or -1.
 *
 * Binary lifting: `jump[j][v]` is the ancestor `2^j` steps above `v`, built
 * from `jump[j − 1]`. A query follows the jumps for the bits of `k`.
 *
 * @see https://leetcode.com/problems/kth-ancestor-of-a-tree-node/
 * @difficulty Hard
 * @timeComplexity O(n log n) to build, O(log n) per query
 * @spaceComplexity O(n log n)
 *
 * @example
 * const tree = new KthAncestorOfATreeNode(7, [-1, 0, 0, 1, 1, 2, 2]);
 * tree.getKthAncestor(5, 2); // 0
 */
export class KthAncestorOfATreeNode {
	readonly #jump: Int32Array[];

	constructor(n: number, parent: readonly number[]) {
		const levels = Math.max(1, Math.ceil(Math.log2(n + 1)));
		this.#jump = [Int32Array.from(parent)];
		for (let j = 1; j < levels; j++) {
			const previous = this.#jump[j - 1] ?? new Int32Array(n);
			this.#jump.push(
				Int32Array.from(previous, (up) =>
					up === -1 ? -1 : (previous[up] ?? -1),
				),
			);
		}
	}

	getKthAncestor(node: number, k: number): number {
		let current = node;
		for (let j = 0; current !== -1 && k >> j > 0; j++) {
			if ((k >> j) & 1) current = this.#jump[j]?.[current] ?? -1;
		}
		return current;
	}
}
