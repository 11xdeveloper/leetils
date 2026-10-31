/**
 * 3777. Minimum Deletions to Make Alternating Substring
 *
 * `s` holds A and B. Query `[1, j]` flips `s[j]`; query `[2, l, r]` asks
 * for the fewest deletions that make `s[l..r]` alternate.
 *
 * Each pair of equal neighbours needs one deletion, so keep a Fenwick tree
 * marking them; a flip only changes the two pairs around it.
 *
 * @see https://leetcode.com/problems/minimum-deletions-to-make-alternating-substring/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumDeletionsToMakeAlternatingSubstring("ABA", [[2, 1, 2], [1, 1], [2, 0, 2]]); // [0, 2]
 */
export const minimumDeletionsToMakeAlternatingSubstring = (
	s: string,
	queries: readonly (readonly number[])[],
): number[] => {
	const n = s.length;
	const chars = [...s];
	const tree = new Int32Array(n + 1);
	const update = (i: number, delta: number): void => {
		for (i++; i <= n; i += i & -i) tree[i] = (tree[i] ?? 0) + delta;
	};
	const prefix = (i: number): number => {
		let total = 0;
		for (; i > 0; i -= i & -i) total += tree[i] ?? 0;
		return total;
	};
	// Pair i joins positions i and i + 1.
	const same = (i: number): boolean =>
		i >= 0 && i + 1 < n && chars[i] === chars[i + 1];
	for (let i = 0; i + 1 < n; i++) if (same(i)) update(i, 1);
	const answers: number[] = [];
	for (const [kind = 0, a = 0, b = 0] of queries) {
		if (kind === 2) {
			answers.push(prefix(b) - prefix(a));
			continue;
		}
		for (const i of [a - 1, a]) if (same(i)) update(i, -1);
		chars[a] = chars[a] === "A" ? "B" : "A";
		for (const i of [a - 1, a]) if (same(i)) update(i, 1);
	}
	return answers;
};
