/**
 * 3076. Shortest Uncommon Substring in an Array
 *
 * For each string, its shortest substring that's not a substring of any
 * other string in `arr`, the lexicographically smallest on a tie, or `""`
 * if there's none.
 *
 * Count, for every substring, how many strings contain it. Then each
 * string's answer is its first substring, by length then alphabetically,
 * contained by just one string.
 *
 * @see https://leetcode.com/problems/shortest-uncommon-substring-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(n · L³), for strings of length up to L
 * @spaceComplexity O(n · L³)
 *
 * @example
 * shortestUncommonSubstringInAnArray(["cab", "ad", "bad", "c"]); // ["ab", "", "ba", ""]
 */
export const shortestUncommonSubstringInAnArray = (
	arr: readonly string[],
): string[] => {
	const substrings = arr.map((word) => {
		const all = new Set<string>();
		for (let i = 0; i < word.length; i++)
			for (let j = i + 1; j <= word.length; j++) all.add(word.slice(i, j));
		return all;
	});
	const containing = new Map<string, number>();
	for (const all of substrings)
		for (const sub of all) containing.set(sub, (containing.get(sub) ?? 0) + 1);
	return substrings.map(
		(all) =>
			[...all]
				.filter((sub) => containing.get(sub) === 1)
				.sort(
					(a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0),
				)[0] ?? "",
	);
};
