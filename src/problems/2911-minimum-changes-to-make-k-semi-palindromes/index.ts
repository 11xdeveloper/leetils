/**
 * 2911. Minimum Changes to Make K Semi-palindromes
 *
 * A string of length `len` is a semi-palindrome if for some divisor `d`
 * of `len` with `d < len`, the characters at each residue modulo `d` read
 * as a palindrome. Splits `s` into `k` substrings and returns the fewest
 * letter changes that make each a semi-palindrome.
 *
 * Price every substring by trying each divisor, then DP over prefixes and
 * the number of pieces used.
 *
 * @see https://leetcode.com/problems/minimum-changes-to-make-k-semi-palindromes/
 * @difficulty Hard
 * @timeComplexity O(n³ log n + k · n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * minimumChangesToMakeKSemiPalindromes("abcac", 2); // 1
 */
export const minimumChangesToMakeKSemiPalindromes = (
	s: string,
	k: number,
): number => {
	const n = s.length;
	const cost = Array.from({ length: n }, () =>
		Array.from({ length: n + 1 }, () => Number.POSITIVE_INFINITY),
	);
	for (let start = 0; start < n; start++)
		for (let end = start + 2; end <= n; end++) {
			const len = end - start;
			let best = Number.POSITIVE_INFINITY;
			for (let d = 1; d < len; d++) {
				if (len % d !== 0) continue;
				let changes = 0;
				const rows = len / d;
				for (let residue = 0; residue < d; residue++)
					for (let i = 0, j = rows - 1; i < j; i++, j--)
						if (
							s.charAt(start + residue + i * d) !==
							s.charAt(start + residue + j * d)
						)
							changes++;
				best = Math.min(best, changes);
			}
			(cost[start] ?? [])[end] = best;
		}

	let best = Array.from({ length: n + 1 }, (_, i) =>
		i === 0 ? 0 : Number.POSITIVE_INFINITY,
	);
	for (let piece = 1; piece <= k; piece++) {
		const next = Array.from({ length: n + 1 }, () => Number.POSITIVE_INFINITY);
		for (let end = 2; end <= n; end++)
			for (let start = 0; start + 2 <= end; start++)
				next[end] = Math.min(
					next[end] ?? 0,
					(best[start] ?? 0) + (cost[start]?.[end] ?? 0),
				);
		best = next;
	}
	return best[n] ?? 0;
};
