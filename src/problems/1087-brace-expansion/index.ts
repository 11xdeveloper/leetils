/**
 * 1087. Brace Expansion
 *
 * Each position of the word is a letter or a set of options in braces, like
 * `"{a,b}c{d,e}f"`. Returns every word it describes, in lexicographic
 * order.
 *
 * Splits the pattern into groups of options, sorts each group, and builds
 * the words position by position; sorted groups make the output sorted.
 *
 * @see https://leetcode.com/problems/brace-expansion/
 * @difficulty Medium
 * @timeComplexity O(product of the group sizes · n)
 * @spaceComplexity O(product of the group sizes · n)
 *
 * @example
 * braceExpansion("{a,b}c{d,e}f"); // ["acdf", "acef", "bcdf", "bcef"]
 */
export const braceExpansion = (s: string): string[] => {
	const groups = (s.match(/\{[^}]*\}|[a-z]/g) ?? []).map((part) =>
		part.startsWith("{") ? part.slice(1, -1).split(",").sort() : [part],
	);
	let words = [""];
	for (const options of groups)
		words = words.flatMap((prefix) => options.map((option) => prefix + option));
	return words;
};
