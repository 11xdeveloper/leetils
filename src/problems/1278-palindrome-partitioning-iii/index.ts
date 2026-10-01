/**
 * 1278. Palindrome Partitioning III
 *
 * Returns the fewest characters of `s` to change so that it can be split
 * into `k` non-empty palindromes.
 *
 * `cost[i][j]` is the changes making `s[i … j]` a palindrome: mismatched
 * pairs, built from the inside out. Then `best[p][j]` is the cheapest way
 * to split the first `j` characters into `p` palindromes, trying every
 * start for the last one.
 *
 * @see https://leetcode.com/problems/palindrome-partitioning-iii/
 * @difficulty Hard
 * @timeComplexity O(k · n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * palindromePartitioningIII("abc", 2); // 1
 */
export const palindromePartitioningIII = (s: string, k: number): number => {
	const n = s.length;
	const cost = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	for (let i = n - 1; i >= 0; i--) {
		const row = cost[i] ?? [];
		for (let j = i + 1; j < n; j++) {
			row[j] = (cost[i + 1]?.[j - 1] ?? 0) + (s[i] === s[j] ? 0 : 1);
		}
	}
	let best = new Array<number>(n + 1).fill(Infinity);
	best[0] = 0;
	for (let parts = 1; parts <= k; parts++) {
		const next = new Array<number>(n + 1).fill(Infinity);
		for (let end = parts; end <= n; end++) {
			for (let start = parts - 1; start < end; start++) {
				const total = (best[start] ?? Infinity) + (cost[start]?.[end - 1] ?? 0);
				if (total < (next[end] ?? Infinity)) next[end] = total;
			}
		}
		best = next;
	}
	return best[n] ?? 0;
};
