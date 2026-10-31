/**
 * 3167. Better Compression of String
 *
 * Rewrite a compressed string like `"a3c9b2c1"` (letters followed by
 * counts, letters possibly repeated) so each letter appears once, in
 * alphabetical order, with its total count.
 *
 * Parse letter-count pairs and add up counts per letter.
 *
 * @see https://leetcode.com/problems/better-compression-of-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * betterCompressionOfString("a3c9b2c1"); // "a3b2c10"
 */
export const betterCompressionOfString = (compressed: string): string => {
	const totals = new Array<number>(26).fill(0);
	for (const [, letter = "a", count = "0"] of compressed.matchAll(
		/([a-z])(\d+)/g,
	))
		totals[letter.charCodeAt(0) - 97] =
			(totals[letter.charCodeAt(0) - 97] ?? 0) + Number(count);
	return totals
		.map((count, i) =>
			count > 0 ? `${String.fromCharCode(97 + i)}${count}` : "",
		)
		.join("");
};
