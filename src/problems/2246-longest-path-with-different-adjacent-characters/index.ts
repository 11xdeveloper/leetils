/**
 * 2246. Longest Path With Different Adjacent Characters
 *
 * In a tree given by `parent`, node `i` carries the letter `s[i]`. Returns
 * the most nodes on a path with no two adjacent nodes sharing a letter.
 *
 * Process nodes children-first. Each node keeps the longest valid chain
 * down from it, built from children with a different letter; the two
 * longest such chains joined at the node form a candidate path.
 *
 * @see https://leetcode.com/problems/longest-path-with-different-adjacent-characters/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestPathWithDifferentAdjacentCharacters([-1, 0, 0, 1, 1, 2], "abacbe"); // 3
 */
export const longestPathWithDifferentAdjacentCharacters = (
	parent: readonly number[],
	s: string,
): number => {
	const n = parent.length;
	const children: number[][] = parent.map(() => []);
	for (let node = 1; node < n; node++) children[parent[node] ?? 0]?.push(node);
	const order = [0];
	for (let head = 0; head < order.length; head++)
		order.push(...(children[order[head] ?? 0] ?? []));

	const chain = new Array<number>(n).fill(1);
	let best = 1;
	for (const node of order.toReversed()) {
		let [first, second] = [0, 0];
		for (const child of children[node] ?? []) {
			if (s[child] === s[node]) continue;
			const length = chain[child] ?? 0;
			if (length > first) [first, second] = [length, first];
			else if (length > second) second = length;
		}
		chain[node] = first + 1;
		best = Math.max(best, first + second + 1);
	}
	return best;
};
