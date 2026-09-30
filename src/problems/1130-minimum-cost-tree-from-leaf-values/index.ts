/**
 * 1130. Minimum Cost Tree From Leaf Values
 *
 * Considers full binary trees whose leaves, in order, are `arr`, where each
 * internal node's value is the product of the largest leaf in its left and
 * right subtrees. Returns the smallest possible sum of the internal nodes.
 *
 * Greedy with a decreasing stack: building the tree amounts to repeatedly
 * merging two neighbouring values, paying their product and keeping the
 * larger. The smallest value is best merged with the smaller of its
 * neighbours, and the stack finds each value's neighbours as it goes.
 *
 * @see https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostTreeFromLeafValues([6, 2, 4]); // 32
 */
export const minimumCostTreeFromLeafValues = (
	arr: readonly number[],
): number => {
	const stack = [Infinity];
	let cost = 0;
	for (const value of arr) {
		while ((stack.at(-1) ?? Infinity) <= value) {
			const smallest = stack.pop() ?? 0;
			cost += smallest * Math.min(stack.at(-1) ?? Infinity, value);
		}
		stack.push(value);
	}
	while (stack.length > 2) {
		const smallest = stack.pop() ?? 0;
		cost += smallest * (stack.at(-1) ?? 0);
	}
	return cost;
};
