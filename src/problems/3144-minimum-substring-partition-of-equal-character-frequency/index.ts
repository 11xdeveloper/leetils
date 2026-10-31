/**
 * 3144. Minimum Substring Partition of Equal Character Frequency
 *
 * Split `s` into the fewest balanced substrings, where a substring is
 * balanced if all the letters in it appear equally often.
 *
 * `best[i]` is the fewest pieces for the first i letters. For each end,
 * grow the last piece leftwards, tracking its letter counts: it's balanced
 * when its most common letter's count times the number of distinct letters
 * equals its length.
 *
 * @see https://leetcode.com/problems/minimum-substring-partition-of-equal-character-frequency/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumSubstringPartitionOfEqualCharacterFrequency("fabccddg"); // 3
 */
export const minimumSubstringPartitionOfEqualCharacterFrequency = (
	s: string,
): number => {
	const n = s.length;
	const best = new Array<number>(n + 1).fill(Number.POSITIVE_INFINITY);
	best[0] = 0;
	for (let end = 1; end <= n; end++) {
		const counts = new Array<number>(26).fill(0);
		let distinct = 0;
		let most = 0;
		for (let start = end - 1; start >= 0; start--) {
			const letter = s.charCodeAt(start) - 97;
			const count = (counts[letter] ?? 0) + 1;
			counts[letter] = count;
			if (count === 1) distinct++;
			most = Math.max(most, count);
			if (most * distinct === end - start)
				best[end] = Math.min(best[end] ?? 0, (best[start] ?? 0) + 1);
		}
	}
	return best[n] ?? 0;
};
