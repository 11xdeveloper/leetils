/**
 * 791. Custom Sort String
 *
 * Rearranges `s` so its characters that appear in `order` (all distinct)
 * come in that order. Characters not in `order` go at the end, in their
 * original order here, though any placement is accepted.
 *
 * Counts the characters of `s`, writes the ones in `order` first, then the
 * rest.
 *
 * @see https://leetcode.com/problems/custom-sort-string/
 * @difficulty Medium
 * @timeComplexity O(n + |order|)
 * @spaceComplexity O(n)
 *
 * @example
 * customSortString("cba", "abcd"); // "cbad"
 */
export const customSortString = (order: string, s: string): string => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	let result = "";
	for (const char of order) {
		result += char.repeat(counts.get(char) ?? 0);
		counts.delete(char);
	}
	for (const char of s) if (counts.has(char)) result += char;
	return result;
};
