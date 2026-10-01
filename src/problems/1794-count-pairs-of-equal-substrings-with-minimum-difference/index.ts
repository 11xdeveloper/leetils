/**
 * 1794. Count Pairs of Equal Substrings With Minimum Difference
 *
 * Counts the quadruples `(i, j, a, b)` where `firstString[i … j]` equals
 * `secondString[a … b]` and `j − a` is as small as any such quadruple
 * allows.
 *
 * Shortening a matching pair to its first character lowers `j` without
 * changing `a`, so the minimum is reached only by single characters. For
 * each letter, the best pairs its first position in `firstString` with its
 * last in `secondString`; count the letters achieving the overall minimum.
 *
 * @see https://leetcode.com/problems/count-pairs-of-equal-substrings-with-minimum-difference/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * countPairsOfEqualSubstringsWithMinimumDifference("abcd", "bccda"); // 1
 */
export const countPairsOfEqualSubstringsWithMinimumDifference = (
	firstString: string,
	secondString: string,
): number => {
	const last = new Map<string, number>();
	for (let a = 0; a < secondString.length; a++)
		last.set(secondString[a] ?? "", a);
	const seen = new Set<string>();
	let [smallest, count] = [Infinity, 0];
	for (let i = 0; i < firstString.length; i++) {
		const char = firstString[i] ?? "";
		const a = last.get(char);
		if (seen.has(char) || a === undefined) continue;
		seen.add(char);
		if (i - a < smallest) [smallest, count] = [i - a, 1];
		else if (i - a === smallest) count++;
	}
	return count;
};
