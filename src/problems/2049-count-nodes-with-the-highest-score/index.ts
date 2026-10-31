/**
 * 2049. Count Nodes With the Highest Score
 *
 * Removing a node from a tree (given by `parents`) splits it into up to
 * three parts; the node's score is the product of their sizes. Counts the
 * nodes with the highest score.
 *
 * Subtree sizes give each child's part, and the rest of the tree is the
 * part above. Visit nodes in breadth-first order and add up sizes in
 * reverse.
 *
 * @see https://leetcode.com/problems/count-nodes-with-the-highest-score/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countNodesWithTheHighestScore([-1, 2, 0, 2, 0]); // 3
 */
export const countNodesWithTheHighestScore = (
	parents: readonly number[],
): number => {
	const n = parents.length;
	const children: number[][] = parents.map(() => []);
	for (const [node, parent] of parents.entries())
		if (parent !== -1) children[parent]?.push(node);

	const order = [0];
	for (let head = 0; head < order.length; head++)
		order.push(...(children[order[head] ?? 0] ?? []));
	const size = new Array<number>(n).fill(1);
	for (const node of order.toReversed()) {
		const parent = parents[node] ?? -1;
		if (parent !== -1) size[parent] = (size[parent] ?? 0) + (size[node] ?? 0);
	}

	let [best, count] = [0, 0];
	for (let node = 0; node < n; node++) {
		let score = Math.max(1, n - (size[node] ?? 0));
		for (const child of children[node] ?? []) score *= size[child] ?? 1;
		if (score > best) [best, count] = [score, 1];
		else if (score === best) count++;
	}
	return count;
};
