/**
 * 2005. Subtree Removal Game with Fibonacci Tree
 *
 * A Fibonacci tree of order `n` is a root whose left subtree has order
 * `n - 2` and right subtree order `n - 1` (order 0 is empty, order 1 a
 * single node). Players alternately remove a node with its subtree; whoever
 * must remove the root loses. Returns whether Alice, moving first, wins.
 *
 * This is Green Hackenbush on a tree: by the colon principle a node's
 * Grundy value is the XOR of each child's value plus one. Alice wins when
 * the root's value is nonzero.
 *
 * @see https://leetcode.com/problems/subtree-removal-game-with-fibonacci-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * subtreeRemovalGameWithFibonacciTree(3); // true
 */
export const subtreeRemovalGameWithFibonacciTree = (n: number): boolean => {
	// Grundy values of the orders n - 2 and n - 1; order 0 is no child at all.
	let [older, newer] = [-1, 0];
	for (let order = 2; order <= n; order++) {
		const left = older === -1 ? 0 : older + 1;
		[older, newer] = [newer, left ^ (newer + 1)];
	}
	return newer !== 0;
};
