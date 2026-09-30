/**
 * 839. Similar String Groups
 *
 * `strs` are anagrams of each other. Two strings are similar if they're
 * equal or swapping two letters of one gives the other. Returns how many
 * groups the strings form, where similarity links strings into a group
 * (directly or through others).
 *
 * Union–find, checking every pair: anagrams are similar exactly when they
 * differ in 0 or 2 positions.
 *
 * @see https://leetcode.com/problems/similar-string-groups/
 * @difficulty Hard
 * @timeComplexity O(n^2 · L) for n strings of length L
 * @spaceComplexity O(n)
 *
 * @example
 * similarStringGroups(["tars", "rats", "arts", "star"]); // 2
 */
export const similarStringGroups = (strs: readonly string[]): number => {
	const parent = strs.map((_, i) => i);
	const find = (i: number): number => {
		while (parent[i] !== i) {
			const grandparent = parent[parent[i] ?? i] ?? i;
			parent[i] = grandparent;
			i = grandparent;
		}
		return i;
	};
	const similar = (a: string, b: string): boolean => {
		let differences = 0;
		for (let i = 0; i < a.length && differences <= 2; i++)
			if (a.charAt(i) !== b.charAt(i)) differences++;
		return differences === 0 || differences === 2;
	};

	let groups = strs.length;
	for (let i = 0; i < strs.length; i++) {
		for (let j = i + 1; j < strs.length; j++) {
			if (!similar(strs[i] ?? "", strs[j] ?? "")) continue;
			const [a, b] = [find(i), find(j)];
			if (a !== b) {
				parent[a] = b;
				groups--;
			}
		}
	}
	return groups;
};
