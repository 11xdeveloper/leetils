/**
 * 1519. Number of Nodes in the Sub-Tree With the Same Label
 *
 * In a tree rooted at 0 with a letter label per node, returns for each node
 * how many nodes in its subtree share its label.
 *
 * Depth-first search with an explicit stack and one running count per
 * letter: the count for a node's label just after its subtree, minus the
 * count just before entering it, is the answer.
 *
 * @see https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfNodesInTheSubTreeWithTheSameLabel(4, [[0, 1], [1, 2], [0, 3]], "bbbb"); // [4, 2, 1, 1]
 */
export const numberOfNodesInTheSubTreeWithTheSameLabel = (
	n: number,
	edges: readonly (readonly number[])[],
	labels: string,
): number[] => {
	const neighbours = Array.from({ length: n }, (): number[] => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const counts = new Array<number>(26).fill(0);
	const answer = new Array<number>(n).fill(0);
	const before = new Array<number>(n).fill(0);
	const seen = new Uint8Array(n);
	// Positive entries enter a node; a node's bitwise complement leaves it.
	const stack = [0];
	seen[0] = 1;
	for (let item = stack.pop(); item !== undefined; item = stack.pop()) {
		const node = item >= 0 ? item : ~item;
		const label = labels.charCodeAt(node) - 97;
		if (item < 0) {
			answer[node] = (counts[label] ?? 0) - (before[node] ?? 0);
			continue;
		}
		before[node] = counts[label] ?? 0;
		counts[label] = (counts[label] ?? 0) + 1;
		stack.push(~node);
		for (const next of neighbours[node] ?? []) {
			if (seen[next]) continue;
			seen[next] = 1;
			stack.push(next);
		}
	}
	return answer;
};
