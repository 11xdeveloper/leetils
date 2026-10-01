/**
 * 591. Tag Validator
 *
 * Returns whether `code` is valid under the problem's rules: it's wrapped
 * in one closed tag `<NAME>…</NAME>` whose name is 1 to 9 capital letters,
 * and the content may hold text, properly nested valid tags, and CDATA
 * sections `<![CDATA[…]]>` whose contents aren't parsed. Every `<` must
 * start a CDATA section or a tag with a closing `>`.
 *
 * Scans left to right with a stack of open tag names. Anything outside the
 * outermost tag, including a second top-level tag, makes it invalid.
 *
 * @see https://leetcode.com/problems/tag-validator/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * tagValidator("<DIV>This is the first line <![CDATA[<div>]]></DIV>"); // true
 */
export const tagValidator = (code: string): boolean => {
	const open: string[] = [];

	for (let i = 0; i < code.length; ) {
		// Everything must be inside the outermost tag.
		if (i > 0 && open.length === 0) return false;

		if (code.startsWith("<![CDATA[", i)) {
			if (open.length === 0) return false;
			const end = code.indexOf("]]>", i + 9);
			if (end === -1) return false;
			i = end + 3;
		} else if (code.startsWith("</", i)) {
			const end = code.indexOf(">", i + 2);
			if (end === -1 || open.pop() !== code.slice(i + 2, end)) return false;
			i = end + 1;
		} else if (code.charAt(i) === "<") {
			const end = code.indexOf(">", i + 1);
			const name = code.slice(i + 1, end);
			if (end === -1 || !/^[A-Z]{1,9}$/.test(name)) return false;
			open.push(name);
			i = end + 1;
		} else {
			if (open.length === 0) return false;
			i++;
		}
	}

	return open.length === 0 && code.length > 0;
};
