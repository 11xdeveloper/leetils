/**
 * 2430. Maximum Deletions on a String
 *
 * An operation deletes the whole remaining string, or its first `i`
 * letters when they equal the next `i`. Returns the most operations to
 * delete `s`.
 *
 * `best[i]` is the most operations for the suffix from `i`; it may delete
 * a prefix of length `l` when the longest common prefix of the suffixes at
 * `i` and `i + l` is at least `l`. Those lengths fill a table row by row.
 *
 * @see https://leetcode.com/problems/maximum-deletions-on-a-string/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumDeletionsOnAString("abcabcdabc"); // 2
 */
export const maximumDeletionsOnAString = (s: string): number => {
	const n = s.length;
	const best = new Array<number>(n + 1).fill(0);
	// common[j]: longest common prefix of the suffixes at i and j (for the current i).
	let common = new Int32Array(n + 1);
	for (let i = n - 1; i >= 0; i--) {
		const current = new Int32Array(n + 1);
		best[i] = 1;
		for (let j = n - 1; j > i; j--) {
			current[j] = s[i] === s[j] ? (common[j + 1] ?? 0) + 1 : 0;
			const length = j - i;
			if ((current[j] ?? 0) >= length)
				best[i] = Math.max(best[i] ?? 0, (best[j] ?? 0) + 1);
		}
		common = current;
	}
	return best[0] ?? 0;
};
