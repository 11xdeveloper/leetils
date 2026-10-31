/**
 * 2673. Make Costs of Paths Equal in a Binary Tree
 *
 * In a perfect binary tree of `n` nodes numbered from 1, node `i` costs
 * `cost[i - 1]`. Each increment adds 1 to a node's cost. Returns the
 * fewest increments that give every root-to-leaf path the same cost.
 *
 * Bottom up, two sibling subtrees must end equal: raise the cheaper by
 * the difference, then pass the larger path cost up to the parent.
 *
 * @see https://leetcode.com/problems/make-costs-of-paths-equal-in-a-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * makeCostsOfPathsEqualInABinaryTree(7, [1, 5, 2, 2, 3, 3, 1]); // 6
 */
export const makeCostsOfPathsEqualInABinaryTree = (
	n: number,
	cost: readonly number[],
): number => {
	const path = [...cost];
	let increments = 0;
	for (let parent = Math.floor(n / 2); parent >= 1; parent--) {
		const left = path[2 * parent - 1] ?? 0;
		const right = path[2 * parent] ?? 0;
		increments += Math.abs(left - right);
		path[parent - 1] = (path[parent - 1] ?? 0) + Math.max(left, right);
	}
	return increments;
};
