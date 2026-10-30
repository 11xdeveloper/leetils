/**
 * 2445. Number of Nodes With Value One
 *
 * Nodes 1 to `n` form a tree where node `v`'s parent is `⌊v / 2⌋`; all
 * start at 0. Each query flips every value in a node's subtree. Returns
 * how many nodes are 1 at the end.
 *
 * A node ends at 1 when an odd number of queries hit it or its ancestors.
 *
 * @see https://leetcode.com/problems/number-of-nodes-with-value-one/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfNodesWithValueOne(5, [1, 2, 5]); // 3
 */
export const numberOfNodesWithValueOne = (
	n: number,
	queries: readonly number[],
): number => {
	const flips = new Uint8Array(n + 1);
	for (const node of queries) flips[node] = (flips[node] ?? 0) ^ 1;
	let ones = 0;
	for (let node = 1; node <= n; node++) {
		if (node > 1) flips[node] = (flips[node] ?? 0) ^ (flips[node >> 1] ?? 0);
		ones += flips[node] ?? 0;
	}
	return ones;
};
