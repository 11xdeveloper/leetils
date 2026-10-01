/**
 * 1902. Depth of BST Given Insertion Order
 *
 * Returns the depth of the binary search tree built by inserting the
 * permutation `order` of `1 … n`.
 *
 * A new value becomes the child of whichever of its nearest inserted
 * neighbours (predecessor or successor) is deeper. Those neighbours are
 * found offline: delete values from a linked list of `1 … n` in reverse
 * insertion order, reading each one's neighbours just before deleting it.
 *
 * @see https://leetcode.com/problems/depth-of-bst-given-insertion-order/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * depthOfBstGivenInsertionOrder([2, 1, 4, 3]); // 3
 */
export const depthOfBstGivenInsertionOrder = (
	order: readonly number[],
): number => {
	const n = order.length;
	// Values 0 and n + 1 are sentinels at depth 0.
	const previous = Array.from({ length: n + 2 }, (_, v) => v - 1);
	const next = Array.from({ length: n + 2 }, (_, v) => v + 1);
	const neighbours: [number, number][] = new Array(n + 2);
	for (let i = n - 1; i >= 0; i--) {
		const value = order[i] ?? 0;
		const [before, after] = [previous[value] ?? 0, next[value] ?? 0];
		neighbours[value] = [before, after];
		next[before] = after;
		previous[after] = before;
	}
	const depth = new Array<number>(n + 2).fill(0);
	let deepest = 0;
	for (const value of order) {
		const [before, after] = neighbours[value] ?? [0, 0];
		depth[value] = 1 + Math.max(depth[before] ?? 0, depth[after] ?? 0);
		deepest = Math.max(deepest, depth[value] ?? 0);
	}
	return deepest;
};
