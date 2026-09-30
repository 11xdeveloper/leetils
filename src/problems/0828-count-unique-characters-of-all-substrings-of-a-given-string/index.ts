/**
 * 828. Count Unique Characters of All Substrings of a Given String
 *
 * `countUniqueChars(t)` is the number of characters appearing exactly once
 * in `t`. Returns the sum of it over every substring of `s`.
 *
 * Counts each character's contribution instead: an occurrence at `i` is
 * unique in the substrings that start after the previous occurrence of the
 * same letter and end before the next, which is
 * `(i - previous) · (next - i)` substrings.
 *
 * @see https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countUniqueCharactersOfAllSubstringsOfAGivenString("ABC"); // 10
 */
export const countUniqueCharactersOfAllSubstringsOfAGivenString = (
	s: string,
): number => {
	const positions = new Map<string, number[]>();
	for (const [i, char] of [...s].entries()) {
		const list = positions.get(char);
		if (list) list.push(i);
		else positions.set(char, [i]);
	}

	let total = 0;
	for (const list of positions.values()) {
		for (const [k, i] of list.entries()) {
			const previous = list[k - 1] ?? -1;
			const next = list[k + 1] ?? s.length;
			total += (i - previous) * (next - i);
		}
	}
	return total;
};
