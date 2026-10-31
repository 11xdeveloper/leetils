/**
 * 3839. Number of Prefix Connected Groups
 *
 * Words of length at least `k` sharing their first k letters form a
 * group. Counts the groups with at least two words.
 *
 * @see https://leetcode.com/problems/number-of-prefix-connected-groups/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * numberOfPrefixConnectedGroups(["bat", "dog", "dog", "doggy", "bat"], 3); // 2
 */
export const numberOfPrefixConnectedGroups = (
	words: readonly string[],
	k: number,
): number => {
	const sizes = new Map<string, number>();
	for (const word of words)
		if (word.length >= k)
			sizes.set(word.slice(0, k), (sizes.get(word.slice(0, k)) ?? 0) + 1);
	return [...sizes.values()].filter((size) => size >= 2).length;
};
