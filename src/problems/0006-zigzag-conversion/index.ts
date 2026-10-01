/**
 * 6. Zigzag Conversion
 *
 * Writes `s` in a zigzag down and up across `numRows` rows, then returns the
 * rows read left to right, top to bottom.
 *
 * The zigzag repeats every `2 * numRows - 2` characters, so each row's
 * characters can be read directly by index: one per cycle, plus a second one
 * on the way back up for every row except the first and last.
 *
 * @see https://leetcode.com/problems/zigzag-conversion/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the returned string
 *
 * @example
 * zigzagConversion("PAYPALISHIRING", 3); // "PAHNAPLSIIGYIR"
 */
export const zigzagConversion = (s: string, numRows: number): string => {
	if (numRows === 1) return s;

	const cycle = 2 * numRows - 2;
	const chars: string[] = [];

	for (let row = 0; row < numRows; row++) {
		for (let i = row; i < s.length; i += cycle) {
			chars.push(s.charAt(i));

			const upward = i + cycle - 2 * row;
			if (row > 0 && row < numRows - 1 && upward < s.length) {
				chars.push(s.charAt(upward));
			}
		}
	}

	return chars.join("");
};
