/**
 * 2788. Split Strings by Separator
 *
 * Splits every word on `separator`, dropping empty pieces. Returns all
 * the pieces in order.
 *
 * Split, flatten and filter.
 *
 * @see https://leetcode.com/problems/split-strings-by-separator/
 * @difficulty Easy
 * @timeComplexity O(total length)
 * @spaceComplexity O(total length)
 *
 * @example
 * splitStringsBySeparator(["$easy$", "$problem$"], "$"); // ["easy", "problem"]
 */
export const splitStringsBySeparator = (
	words: readonly string[],
	separator: string,
): string[] =>
	words
		.flatMap((word) => word.split(separator))
		.filter((piece) => piece !== "");
