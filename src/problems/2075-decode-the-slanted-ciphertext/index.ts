/**
 * 2075. Decode the Slanted Ciphertext
 *
 * The original text was written along the diagonals of a matrix with
 * `rows` rows, padded with spaces, and read out row by row. Returns the
 * original text, which has no trailing spaces.
 *
 * Read each diagonal from the top row, then drop the trailing padding.
 *
 * @see https://leetcode.com/problems/decode-the-slanted-ciphertext/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * decodeTheSlantedCiphertext("ch   ie   pr", 3); // "cipher"
 */
export const decodeTheSlantedCiphertext = (
	encodedText: string,
	rows: number,
): string => {
	const cols = encodedText.length / rows;
	const chars: string[] = [];
	for (let start = 0; start < cols; start++) {
		for (let row = 0; row < rows && start + row < cols; row++)
			chars.push(encodedText[row * cols + start + row] ?? "");
	}
	return chars.join("").trimEnd();
};
