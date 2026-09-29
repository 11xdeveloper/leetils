/**
 * 132. Palindrome Partitioning II
 *
 * Returns the fewest cuts needed to split `s` into substrings that are all
 * palindromes.
 *
 * `cuts[i]` is the fewest cuts for the first `i` characters. Expanding
 * around every centre finds each palindrome `s[l..r]`, and each one offers
 * `cuts[l] + 1` as a way to cut the first `r + 1` characters. No table of
 * palindromes is needed.
 *
 * @see https://leetcode.com/problems/palindrome-partitioning-ii/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * palindromePartitioningII("aab"); // 1: "aa" | "b"
 */
export const palindromePartitioningII = (s: string): number => {
	const n = s.length;
	// cuts[i] is the fewest cuts for s.slice(0, i); cuts[0] = -1 so a whole
	// palindrome prefix costs 0 cuts.
	const cuts = Array.from({ length: n + 1 }, (_, i) => i - 1);

	const expand = (left: number, right: number): void => {
		for (let l = left, r = right; l >= 0 && r < n && s[l] === s[r]; l--, r++) {
			cuts[r + 1] = Math.min(cuts[r + 1] ?? 0, (cuts[l] ?? 0) + 1);
		}
	};

	for (let center = 0; center < n; center++) {
		expand(center, center);
		expand(center, center + 1);
	}

	return cuts[n] ?? 0;
};
