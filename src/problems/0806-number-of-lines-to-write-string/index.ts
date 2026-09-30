/**
 * 806. Number of Lines To Write String
 *
 * Writes `s` across lines 100 pixels wide, where letter `c` is `widths[c]`
 * pixels, moving to a new line when the next letter won't fit. Returns
 * `[lines, widthOfLastLine]`.
 *
 * Adds up widths, starting a new line whenever the next letter would pass
 * 100.
 *
 * @see https://leetcode.com/problems/number-of-lines-to-write-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfLinesToWriteString(new Array(26).fill(10), "abcdefghijklmnopqrstuvwxyz"); // [3, 60]
 */
export const numberOfLinesToWriteString = (
	widths: readonly number[],
	s: string,
): number[] => {
	let lines = 1;
	let width = 0;
	for (const char of s) {
		const letter = widths[char.charCodeAt(0) - 97] ?? 0;
		if (width + letter > 100) {
			lines++;
			width = 0;
		}
		width += letter;
	}
	return [lines, width];
};
