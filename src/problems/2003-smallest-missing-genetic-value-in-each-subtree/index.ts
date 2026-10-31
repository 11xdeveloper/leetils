/**
 * 2003. Smallest Missing Genetic Value in Each Subtree
 *
 * Each node of a rooted tree has a distinct genetic value. Returns, for
 * every node, the smallest positive integer missing from its subtree.
 *
 * Only the node holding 1 and its ancestors can miss more than 1. Walk up
 * from that node, adding each newly reached subtree's values to a seen set
 * (each node is added once), and advance the missing value as it fills in.
 *
 * @see https://leetcode.com/problems/smallest-missing-genetic-value-in-each-subtree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestMissingGeneticValueInEachSubtree([-1, 0, 0, 2], [1, 2, 3, 4]); // [5, 1, 1, 1]
 */
export const smallestMissingGeneticValueInEachSubtree = (
	parents: readonly number[],
	nums: readonly number[],
): number[] => {
	const n = parents.length;
	const answer = new Array<number>(n).fill(1);
	const children: number[][] = parents.map(() => []);
	for (const [node, parent] of parents.entries())
		if (parent !== -1) children[parent]?.push(node);

	const seen = new Uint8Array(n + 2);
	const added = new Uint8Array(n);
	let missing = 1;
	for (let node = nums.indexOf(1); node !== -1; node = parents[node] ?? -1) {
		const stack = [node];
		for (let next = stack.pop(); next !== undefined; next = stack.pop()) {
			if (added[next]) continue;
			added[next] = 1;
			const value = nums[next] ?? 0;
			if (value <= n) seen[value] = 1;
			stack.push(...(children[next] ?? []));
		}
		while (seen[missing]) missing++;
		answer[node] = missing;
	}
	return answer;
};
