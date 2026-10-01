/**
 * 1938. Maximum Genetic Difference Query
 *
 * In a rooted tree where node `x` has value `x`, each query `[node, val]`
 * asks for the largest `val XOR p` over `p` on the path from `node` to the
 * root.
 *
 * Depth-first search (explicit stack) keeping the current root path in a
 * binary trie with counts: insert on entering a node, answer its queries
 * greedily, and remove on leaving.
 *
 * @see https://leetcode.com/problems/maximum-genetic-difference-query/
 * @difficulty Hard
 * @timeComplexity O((n + q) · 18)
 * @spaceComplexity O(18n + q)
 *
 * @example
 * maximumGeneticDifferenceQuery([-1, 0, 1, 1], [[0, 2], [3, 2], [2, 5]]); // [2, 3, 7]
 */
export const maximumGeneticDifferenceQuery = (
	parents: readonly number[],
	queries: readonly (readonly number[])[],
): number[] => {
	const BITS = 18;
	const n = parents.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	let root = 0;
	for (const [node, parent] of parents.entries()) {
		if (parent === -1) root = node;
		else children[parent]?.push(node);
	}
	const queriesAt: number[][] = Array.from({ length: n }, () => []);
	for (const [i, [node = 0]] of queries.entries()) queriesAt[node]?.push(i);
	// links[2 · trieNode + bit] and counts[trieNode]; trie node 0 is the root.
	const links: number[] = [0, 0];
	const counts: number[] = [0];
	const update = (value: number, change: number) => {
		let node = 0;
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const slot = 2 * node + ((value >> bit) & 1);
			if (!links[slot]) {
				links[slot] = counts.length;
				counts.push(0);
				links.push(0, 0);
			}
			node = links[slot] ?? 0;
			counts[node] = (counts[node] ?? 0) + change;
		}
	};
	const best = (value: number) => {
		let [node, result] = [0, 0];
		for (let bit = BITS - 1; bit >= 0; bit--) {
			const wanted = 1 - ((value >> bit) & 1);
			const preferred = links[2 * node + wanted] ?? 0;
			if (preferred && (counts[preferred] ?? 0) > 0) {
				result |= 1 << bit;
				node = preferred;
			} else {
				node = links[2 * node + 1 - wanted] ?? 0;
			}
		}
		return result;
	};
	const answer = new Array<number>(queries.length).fill(0);
	const stack: [node: number, leaving: boolean][] = [[root, false]];
	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, leaving] = entry;
		if (leaving) {
			update(node, -1);
			continue;
		}
		update(node, 1);
		for (const i of queriesAt[node] ?? [])
			answer[i] = best(queries[i]?.[1] ?? 0);
		stack.push([node, true]);
		for (const child of children[node] ?? []) stack.push([child, false]);
	}
	return answer;
};
