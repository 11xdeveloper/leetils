/**
 * 2791. Count Paths That Can Form a Palindrome in a Tree
 *
 * In a tree given by `parent`, the edge from node `i` to its parent is
 * labelled `s[i]`. Returns the number of node pairs `u < v` whose path's
 * labels can be rearranged into a palindrome.
 *
 * Give each node the parity mask of letters on its path from the root;
 * a path's mask is the XOR of its ends' masks, and must have at most one
 * bit set. Count matching earlier masks for each node.
 *
 * @see https://leetcode.com/problems/count-paths-that-can-form-a-palindrome-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * countPathsThatCanFormAPalindromeInATree([-1, 0, 0, 0, 0], "zzzzz"); // 10
 */
export const countPathsThatCanFormAPalindromeInATree = (
	parent: readonly number[],
	s: string,
): number => {
	const n = parent.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (let node = 1; node < n; node++) children[parent[node] ?? 0]?.push(node);

	const mask = Array.from({ length: n }, () => 0);
	const seen = new Map<number, number>();
	let pairs = 0;
	const stack = [0];
	for (let node = stack.pop(); node !== undefined; node = stack.pop()) {
		const own = mask[node] ?? 0;
		pairs += seen.get(own) ?? 0;
		for (let bit = 0; bit < 26; bit++) pairs += seen.get(own ^ (1 << bit)) ?? 0;
		seen.set(own, (seen.get(own) ?? 0) + 1);
		for (const child of children[node] ?? []) {
			mask[child] = own ^ (1 << (s.charCodeAt(child) - 97));
			stack.push(child);
		}
	}
	return pairs;
};
