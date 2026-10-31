/**
 * 3545. Minimum Deletions for At Most K Distinct Characters
 *
 * The fewest characters to delete from `s` to leave at most `k` distinct
 * letters.
 *
 * Delete the rarest letters entirely until only `k` remain.
 *
 * @see https://leetcode.com/problems/minimum-deletions-for-at-most-k-distinct-characters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDeletionsForAtMostKDistinctCharacters("abc", 2); // 1
 */
export const minimumDeletionsForAtMostKDistinctCharacters = (
	s: string,
	k: number,
): number => {
	const counts = new Map<string, number>();
	for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
	return [...counts.values()]
		.sort((a, b) => a - b)
		.slice(0, Math.max(0, counts.size - k))
		.reduce((a, b) => a + b, 0);
};
