/**
 * 393. UTF-8 Validation
 *
 * Returns whether `data`, a list of bytes (each an integer whose lowest 8
 * bits are the byte), is valid UTF-8. A character is 1 to 4 bytes: the
 * first byte's leading 1s give the length (none for a single byte), and
 * every continuation byte starts with `10`.
 *
 * Reads each first byte's length from its leading bits, then checks that
 * that many continuation bytes follow.
 *
 * @see https://leetcode.com/problems/utf-8-validation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * utf8Validation([197, 130, 1]); // true: a 2-byte character then a 1-byte one
 */
export const utf8Validation = (data: readonly number[]): boolean => {
	let continuations = 0;

	for (const value of data) {
		const byte = value & 0xff;
		if (continuations > 0) {
			if (byte >> 6 !== 0b10) return false;
			continuations--;
		} else if (byte >> 7 === 0) {
			continuations = 0;
		} else if (byte >> 5 === 0b110) {
			continuations = 1;
		} else if (byte >> 4 === 0b1110) {
			continuations = 2;
		} else if (byte >> 3 === 0b11110) {
			continuations = 3;
		} else {
			return false;
		}
	}

	return continuations === 0;
};
