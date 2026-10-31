/**
 * 3085. Minimum Deletions to Make String K-Special
 *
 * The fewest letters to delete from `word` so that any two remaining
 * letters' frequencies differ by at most `k`.
 *
 * Try each existing frequency as the lowest one kept: letters rarer than it
 * are deleted entirely, and letters more than `k` above it are cut down.
 *
 * @see https://leetcode.com/problems/minimum-deletions-to-make-string-k-special/
 * @difficulty Medium
 * @timeComplexity O(n + 26²)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumDeletionsToMakeStringKSpecial("aabcaba", 0); // 3
 */
export const minimumDeletionsToMakeStringKSpecial = (
	word: string,
	k: number,
): number => {
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < word.length; i++)
		counts[word.charCodeAt(i) - 97] =
			(counts[word.charCodeAt(i) - 97] ?? 0) + 1;
	const present = counts.filter((count) => count > 0);
	let best = Number.POSITIVE_INFINITY;
	for (const low of present) {
		let deleted = 0;
		for (const count of present)
			if (count < low) deleted += count;
			else if (count > low + k) deleted += count - low - k;
		best = Math.min(best, deleted);
	}
	return best;
};
