/**
 * 722. Remove Comments
 *
 * Removes C++ comments from `source`, a program split into lines: `//`
 * comments to the end of the line and `/* … *\/` block comments, which can
 * span lines (joining what's left of them). Lines left empty are dropped.
 *
 * Scans character by character, tracking whether it's inside a block
 * comment. Text outside comments is gathered into the current line, which
 * is only finished at a line end outside a block comment.
 *
 * @see https://leetcode.com/problems/remove-comments/
 * @difficulty Medium
 * @timeComplexity O(total length)
 * @spaceComplexity O(total length)
 *
 * @example
 * removeComments(["a/*comment", "line", "more_comment*\/b"]); // ["ab"]
 */
export const removeComments = (source: readonly string[]): string[] => {
	const result: string[] = [];
	let inBlock = false;
	let current = "";

	for (const line of source) {
		for (let i = 0; i < line.length; i++) {
			const pair = line.slice(i, i + 2);
			if (inBlock) {
				if (pair === "*/") {
					inBlock = false;
					i++;
				}
			} else if (pair === "/*") {
				inBlock = true;
				i++;
			} else if (pair === "//") {
				break;
			} else {
				current += line.charAt(i);
			}
		}
		if (!inBlock && current !== "") {
			result.push(current);
			current = "";
		}
	}

	return result;
};
