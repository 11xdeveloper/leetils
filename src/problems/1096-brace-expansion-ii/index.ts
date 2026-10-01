/**
 * 1096. Brace Expansion II
 *
 * Expands an expression where letters are words, `{a,b,…}` is the union of
 * its comma-separated expressions, and writing expressions side by side
 * concatenates every combination. Returns the distinct words, sorted.
 *
 * Recursive descent over the grammar
 * `union := concat (',' concat)*`, `concat := factor+`,
 * `factor := letter | '{' union '}'`, with sets of words as values.
 *
 * @see https://leetcode.com/problems/brace-expansion-ii/
 * @difficulty Hard
 * @timeComplexity O(size of the output · n) roughly
 * @spaceComplexity O(size of the output)
 *
 * @example
 * braceExpansionII("{a,b}{c,{d,e}}"); // ["ac", "ad", "ae", "bc", "bd", "be"]
 */
export const braceExpansionII = (expression: string): string[] => {
	let position = 0;

	const union = (): Set<string> => {
		const words = concat();
		while (expression.charAt(position) === ",") {
			position++;
			for (const word of concat()) words.add(word);
		}
		return words;
	};
	const concat = (): Set<string> => {
		let words = new Set([""]);
		while (
			position < expression.length &&
			expression.charAt(position) !== "," &&
			expression.charAt(position) !== "}"
		) {
			const next = factor();
			const combined = new Set<string>();
			for (const prefix of words)
				for (const suffix of next) combined.add(prefix + suffix);
			words = combined;
		}
		return words;
	};
	const factor = (): Set<string> => {
		const char = expression.charAt(position++);
		if (char !== "{") return new Set([char]);
		const inner = union();
		position++; // The closing "}".
		return inner;
	};

	return [...union()].sort();
};
