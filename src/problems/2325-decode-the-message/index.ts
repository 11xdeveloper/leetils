/**
 * 2325. Decode the Message
 *
 * The first appearances of the 26 letters in `key` give the substitution
 * table, in alphabet order. Decodes `message`, keeping spaces.
 *
 * Build the table from `key`, then translate.
 *
 * @see https://leetcode.com/problems/decode-the-message/
 * @difficulty Easy
 * @timeComplexity O(k + m)
 * @spaceComplexity O(1)
 *
 * @example
 * decodeTheMessage("the quick brown fox jumps over the lazy dog", "vkbs bs t suepuv"); // "this is a secret"
 */
export const decodeTheMessage = (key: string, message: string): string => {
	const table = new Map([[" ", " "]]);
	for (const char of key) {
		if (!table.has(char))
			table.set(char, String.fromCharCode(97 + table.size - 1));
	}
	return Array.from(message, (char) => table.get(char) ?? char).join("");
};
