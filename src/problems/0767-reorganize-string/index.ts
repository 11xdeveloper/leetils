/**
 * 767. Reorganize String
 *
 * Rearranges `s` so no two neighbouring characters are the same, or returns
 * `""` if that's impossible.
 *
 * It's impossible exactly when some character fills more than half the
 * positions (rounded up). Otherwise, writing the characters most frequent
 * first into the even positions and then the odd ones separates every
 * character from its copies.
 *
 * @see https://leetcode.com/problems/reorganize-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reorganizeString("aab"); // "aba"
 */
export const reorganizeString = (s: string): string => {
	const counts = new Map<string, number>();
	for (const char of s) counts.set(char, (counts.get(char) ?? 0) + 1);
	const byFrequency = [...counts].sort((a, b) => b[1] - a[1]);
	if ((byFrequency[0]?.[1] ?? 0) > Math.ceil(s.length / 2)) return "";

	const result = new Array<string>(s.length);
	let position = 0;
	for (const [char, count] of byFrequency) {
		for (let i = 0; i < count; i++) {
			if (position >= s.length) position = 1;
			result[position] = char;
			position += 2;
		}
	}
	return result.join("");
};
