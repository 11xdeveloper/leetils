/**
 * 1047. Remove All Adjacent Duplicates In String
 *
 * Repeatedly removes two adjacent equal letters from `s` until none remain,
 * and returns the result (which is unique).
 *
 * A stack of kept letters: a letter equal to the top cancels it.
 *
 * @see https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeAllAdjacentDuplicatesInString("abbaca"); // "ca"
 */
export const removeAllAdjacentDuplicatesInString = (s: string): string => {
	const stack: string[] = [];
	for (const char of s) {
		if (stack.at(-1) === char) stack.pop();
		else stack.push(char);
	}
	return stack.join("");
};
