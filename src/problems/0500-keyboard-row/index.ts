/**
 * 500. Keyboard Row
 *
 * Returns the words that can be typed using letters from a single row of an
 * American QWERTY keyboard, in either case.
 *
 * Maps each letter to its row, then keeps the words whose letters all map
 * to the same row as their first.
 *
 * @see https://leetcode.com/problems/keyboard-row/
 * @difficulty Easy
 * @timeComplexity O(total length of the words)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * keyboardRow(["Hello", "Alaska", "Dad", "Peace"]); // ["Alaska", "Dad"]
 */
export const keyboardRow = (words: readonly string[]): string[] => {
	const rowOf = new Map<string, number>();
	for (const [row, letters] of [
		"qwertyuiop",
		"asdfghjkl",
		"zxcvbnm",
	].entries()) {
		for (const letter of letters) rowOf.set(letter, row);
	}

	return words.filter((word) => {
		const lower = word.toLowerCase();
		const row = rowOf.get(lower.charAt(0));
		return [...lower].every((letter) => rowOf.get(letter) === row);
	});
};
