/**
 * 1647. Minimum Deletions to Make Character Frequencies Unique
 *
 * Returns the fewest characters to delete from `s` so that no two letters
 * that remain appear equally often.
 *
 * Going through the frequencies from highest to lowest, each one is cut
 * down to just below the previous kept frequency (or to 0).
 *
 * @see https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDeletionsToMakeCharacterFrequenciesUnique("aaabbbcc"); // 2
 */
export const minimumDeletionsToMakeCharacterFrequenciesUnique = (
	s: string,
): number => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	let [deletions, limit] = [0, Infinity];
	for (const count of [...counts.values()].sort((a, b) => b - a)) {
		const kept = Math.max(0, Math.min(count, limit - 1));
		deletions += count - kept;
		limit = kept;
	}
	return deletions;
};
