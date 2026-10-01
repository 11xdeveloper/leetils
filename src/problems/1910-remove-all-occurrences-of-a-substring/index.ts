/**
 * 1910. Remove All Occurrences of a Substring
 *
 * Repeatedly removes the leftmost occurrence of `part` from `s` until none
 * is left.
 *
 * Build the result as a stack of characters, dropping `part` whenever the
 * stack ends with it; that matches removing the leftmost occurrence each
 * time.
 *
 * @see https://leetcode.com/problems/remove-all-occurrences-of-a-substring/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(n)
 *
 * @example
 * removeAllOccurrencesOfASubstring("daabcbaabcbc", "abc"); // "dab"
 */
export const removeAllOccurrencesOfASubstring = (
	s: string,
	part: string,
): string => {
	const stack: string[] = [];
	for (const char of s) {
		stack.push(char);
		if (
			stack.length >= part.length &&
			stack.slice(-part.length).join("") === part
		)
			stack.length -= part.length;
	}
	return stack.join("");
};
