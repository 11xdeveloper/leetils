/**
 * 3481. Apply Substitutions
 *
 * Replace every `%KEY%` placeholder in `text` with its value from
 * `replacements`, whose values may contain placeholders themselves (with no
 * cycles). Returns the fully expanded text.
 *
 * Expand each key once, recursively, and cache it.
 *
 * @see https://leetcode.com/problems/apply-substitutions/
 * @difficulty Medium
 * @timeComplexity O(output length)
 * @spaceComplexity O(output length)
 *
 * @example
 * applySubstitutions([["A", "abc"], ["B", "def"]], "%A%_%B%"); // "abc_def"
 */
export const applySubstitutions = (
	replacements: readonly (readonly string[])[],
	text: string,
): string => {
	const raw = new Map(
		replacements.map(([key = "", value = ""]) => [key, value]),
	);
	const expanded = new Map<string, string>();
	const expand = (value: string): string =>
		value.replace(/%([A-Z])%/g, (_, key: string) => {
			const cached = expanded.get(key);
			if (cached !== undefined) return cached;
			const result = expand(raw.get(key) ?? "");
			expanded.set(key, result);
			return result;
		});
	return expand(text);
};
