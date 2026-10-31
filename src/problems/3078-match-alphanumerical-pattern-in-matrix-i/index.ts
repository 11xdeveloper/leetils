/**
 * 3078. Match Alphanumerical Pattern in Matrix I
 *
 * Find where `pattern` matches a same-sized block of the digit grid
 * `board`. Pattern digits must match exactly, and pattern letters stand for
 * digits: the same letter always for the same digit, different letters for
 * different digits. Returns the block's top-left corner, the smallest row
 * then column, or `[-1, -1]`.
 *
 * Check every position, keeping the letter-to-digit mapping both ways.
 *
 * @see https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i/
 * @difficulty Medium
 * @timeComplexity O(m · n · p · q), for a p × q pattern
 * @spaceComplexity O(1)
 *
 * @example
 * matchAlphanumericalPatternInMatrixI([[1, 2, 2], [2, 2, 3], [2, 3, 3]], ["ab", "bb"]); // [0, 0]
 */
export const matchAlphanumericalPatternInMatrixI = (
	board: readonly (readonly number[])[],
	pattern: readonly string[],
): [number, number] => {
	const rows = pattern.length;
	const cols = pattern[0]?.length ?? 0;
	const matches = (top: number, left: number): boolean => {
		const letterDigit = new Map<string, number>();
		const digitLetter = new Map<number, string>();
		for (let r = 0; r < rows; r++)
			for (let c = 0; c < cols; c++) {
				const want = pattern[r]?.charAt(c) ?? "";
				const digit = board[top + r]?.[left + c] ?? -1;
				if (want >= "0" && want <= "9") {
					if (Number(want) !== digit) return false;
					continue;
				}
				const mapped = letterDigit.get(want);
				const owner = digitLetter.get(digit);
				if (mapped === undefined && owner === undefined) {
					letterDigit.set(want, digit);
					digitLetter.set(digit, want);
				} else if (mapped !== digit || owner !== want) return false;
			}
		return true;
	};
	for (let top = 0; top + rows <= board.length; top++)
		for (let left = 0; left + cols <= (board[0]?.length ?? 0); left++)
			if (matches(top, left)) return [top, left];
	return [-1, -1];
};
