/**
 * 2157. Groups of Strings
 *
 * Words of distinct letters are connected when one becomes the other by
 * adding, deleting or replacing a single letter (order doesn't matter).
 * Returns the number of connected groups and the size of the largest.
 *
 * Represent words as letter bitmasks and union equal masks with every
 * mask one deletion or replacement away (additions are the reverse of
 * deletions).
 *
 * @see https://leetcode.com/problems/groups-of-strings/
 * @difficulty Hard
 * @timeComplexity O(n · 26^2 · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * groupsOfStrings(["a", "b", "ab", "cde"]); // [2, 3]
 */
export const groupsOfStrings = (words: readonly string[]): number[] => {
	const counts = new Map<number, number>();
	for (const word of words) {
		let mask = 0;
		for (const char of word) mask |= 1 << (char.charCodeAt(0) - 97);
		counts.set(mask, (counts.get(mask) ?? 0) + 1);
	}
	const masks = [...counts.keys()];
	const index = new Map(masks.map((mask, i) => [mask, i]));
	const parent = masks.map((_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		while (parent[x] !== root) [parent[x], x] = [root, parent[x] ?? root];
		return root;
	};
	const union = (a: number, mask: number): void => {
		const b = index.get(mask);
		if (b !== undefined) parent[find(a)] = find(b);
	};
	for (const [i, mask] of masks.entries()) {
		for (let bit = 0; bit < 26; bit++) {
			if (!(mask & (1 << bit))) continue;
			const removed = mask ^ (1 << bit);
			union(i, removed);
			for (let other = 0; other < 26; other++)
				if (!(mask & (1 << other))) union(i, removed | (1 << other));
		}
	}
	const sizes = new Map<number, number>();
	for (const [i, mask] of masks.entries()) {
		const root = find(i);
		sizes.set(root, (sizes.get(root) ?? 0) + (counts.get(mask) ?? 0));
	}
	return [sizes.size, Math.max(...sizes.values())];
};
