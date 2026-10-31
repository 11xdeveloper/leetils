/**
 * 2301. Match Substring After Replacement
 *
 * Each mapping `[old, new]` lets a character `old` of `sub` become `new`
 * (each character of `sub` changes at most once). Returns whether `sub`
 * can be made a substring of `s`.
 *
 * Record the allowed replacements in a table and try every alignment.
 *
 * @see https://leetcode.com/problems/match-substring-after-replacement/
 * @difficulty Hard
 * @timeComplexity O(n · m + r)
 * @spaceComplexity O(1)
 *
 * @example
 * matchSubstringAfterReplacement("fool3e7bar", "leet", [["e", "3"], ["t", "7"], ["t", "8"]]); // true
 */
export const matchSubstringAfterReplacement = (
	s: string,
	sub: string,
	mappings: readonly (readonly string[])[],
): boolean => {
	const allowed = new Uint8Array(128 * 128);
	for (const [from = "", to = ""] of mappings)
		allowed[from.charCodeAt(0) * 128 + to.charCodeAt(0)] = 1;
	for (let start = 0; start + sub.length <= s.length; start++) {
		let matches = true;
		for (let j = 0; j < sub.length && matches; j++) {
			const [want, have] = [sub.charCodeAt(j), s.charCodeAt(start + j)];
			matches = want === have || allowed[want * 128 + have] === 1;
		}
		if (matches) return true;
	}
	return false;
};
