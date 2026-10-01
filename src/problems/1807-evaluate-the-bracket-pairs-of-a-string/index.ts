/**
 * 1807. Evaluate the Bracket Pairs of a String
 *
 * Replaces each `(key)` in `s` with its value from `knowledge`, or `?` if
 * the key is unknown.
 *
 * A map of the knowledge and a single replacement pass.
 *
 * @see https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string/
 * @difficulty Medium
 * @timeComplexity O(n + k)
 * @spaceComplexity O(n + k)
 *
 * @example
 * evaluateTheBracketPairsOfAString("(name)is(age)yearsold", [["name", "bob"], ["age", "two"]]); // "bobistwoyearsold"
 */
export const evaluateTheBracketPairsOfAString = (
	s: string,
	knowledge: readonly (readonly string[])[],
): string => {
	const values = new Map(
		knowledge.map(([key = "", value = ""]) => [key, value]),
	);
	return s.replace(/\((\w+)\)/g, (_, key: string) => values.get(key) ?? "?");
};
