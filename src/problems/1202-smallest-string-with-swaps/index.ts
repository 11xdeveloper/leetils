/**
 * 1202. Smallest String With Swaps
 *
 * Characters at the index pairs in `pairs` can be swapped any number of
 * times. Returns the lexicographically smallest string `s` can become.
 *
 * Swaps within a connected group of indices can arrange its characters in
 * any order. So group the indices with union–find, then give each group's
 * indices its characters in sorted order.
 *
 * @see https://leetcode.com/problems/smallest-string-with-swaps/
 * @difficulty Medium
 * @timeComplexity O(n log n + p · α(n)) for p pairs
 * @spaceComplexity O(n)
 *
 * @example
 * smallestStringWithSwaps("dcab", [[0, 3], [1, 2], [0, 2]]); // "abcd"
 */
export const smallestStringWithSwaps = (
	s: string,
	pairs: readonly (readonly number[])[],
): string => {
	const parent = Array.from({ length: s.length }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	for (const [a = 0, b = 0] of pairs) parent[find(a)] = find(b);
	const groups = new Map<number, number[]>();
	for (let i = 0; i < s.length; i++) {
		const root = find(i);
		const group = groups.get(root);
		if (group) group.push(i);
		else groups.set(root, [i]);
	}
	const result = new Array<string>(s.length);
	for (const indices of groups.values()) {
		const chars = indices.map((i) => s[i] ?? "").sort();
		indices.forEach((index, k) => {
			result[index] = chars[k] ?? "";
		});
	}
	return result.join("");
};
