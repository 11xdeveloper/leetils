/**
 * 3598. Longest Common Prefix Between Adjacent Strings After Removals
 *
 * For each index, remove that word and return the longest common prefix of
 * any two now-adjacent words (0 if fewer than two remain).
 *
 * Removing word i keeps the pairs left of it and right of it, and creates
 * the pair (i - 1, i + 1). Prefix and suffix maxima of the neighbouring
 * pairs' prefixes cover the first two.
 *
 * @see https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals/
 * @difficulty Medium
 * @timeComplexity O(L)
 * @spaceComplexity O(n)
 *
 * @example
 * longestCommonPrefixBetweenAdjacentStringsAfterRemovals(["jump", "run", "run", "jump", "run"]); // [3, 0, 0, 3, 3]
 */
export const longestCommonPrefixBetweenAdjacentStringsAfterRemovals = (
	words: readonly string[],
): number[] => {
	const n = words.length;
	const common = (a: string, b: string): number => {
		let length = 0;
		while (length < a.length && length < b.length && a[length] === b[length])
			length++;
		return length;
	};
	// pair[j]: prefix shared by words j and j + 1.
	const pair = Array.from({ length: Math.max(0, n - 1) }, (_, j) =>
		common(words[j] ?? "", words[j + 1] ?? ""),
	);
	const before = [0];
	for (const value of pair) before.push(Math.max(before.at(-1) ?? 0, value));
	const after = new Array<number>(n + 1).fill(0);
	for (let j = n - 2; j >= 0; j--)
		after[j] = Math.max(after[j + 1] ?? 0, pair[j] ?? 0);
	return words.map((_, i) => {
		let best = Math.max(before[Math.max(0, i - 1)] ?? 0, after[i + 1] ?? 0);
		if (i > 0 && i + 1 < n)
			best = Math.max(best, common(words[i - 1] ?? "", words[i + 1] ?? ""));
		return best;
	});
};
