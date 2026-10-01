/**
 * 443. String Compression
 *
 * Compresses an array of characters in place, as the problem requires:
 * each run of a repeated character becomes the character followed by the
 * run's length (omitted for a run of 1), with multi-digit lengths written
 * digit by digit. Returns the new length; the array's first elements hold
 * the result.
 *
 * Reads runs with one pointer and writes the compressed form with another.
 * The written form is never longer than the run it replaces, so it never
 * overwrites characters not yet read.
 *
 * @see https://leetcode.com/problems/string-compression/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const chars = ["a", "a", "b", "b", "c", "c", "c"];
 * stringCompression(chars); // 6, and chars starts ["a", "2", "b", "2", "c", "3"]
 */
export const stringCompression = (chars: string[]): number => {
	let write = 0;

	for (let read = 0; read < chars.length; ) {
		const char = chars[read] ?? "";
		let end = read;
		while (end < chars.length && chars[end] === char) end++;

		chars[write++] = char;
		if (end - read > 1)
			for (const digit of String(end - read)) chars[write++] = digit;
		read = end;
	}

	return write;
};
