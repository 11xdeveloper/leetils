/**
 * 3803. Count Residue Prefixes
 *
 * Counts the prefixes of `s` whose number of distinct letters equals
 * their length mod 3.
 *
 * @see https://leetcode.com/problems/count-residue-prefixes/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countResiduePrefixes("abc"); // 2
 */
export const countResiduePrefixes = (s: string): number => {
	const seen = new Set<string>();
	let count = 0;
	[...s].forEach((c, i) => {
		seen.add(c);
		if (seen.size === (i + 1) % 3) count++;
	});
	return count;
};
