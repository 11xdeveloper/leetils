/**
 * 1528. Shuffle String
 *
 * Moves the character at position `i` of `s` to position `indices[i]` and
 * returns the result.
 *
 * Writes each character into its new place.
 *
 * @see https://leetcode.com/problems/shuffle-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * shuffleString("codeleet", [4, 5, 6, 7, 0, 2, 1, 3]); // "leetcode"
 */
export const shuffleString = (
	s: string,
	indices: readonly number[],
): string => {
	const result = new Array<string>(s.length);
	indices.forEach((target, i) => {
		result[target] = s[i] ?? "";
	});
	return result.join("");
};
