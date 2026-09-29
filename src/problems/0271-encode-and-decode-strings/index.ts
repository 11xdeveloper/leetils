/**
 * 271. Encode and Decode Strings
 *
 * Encodes a list of strings into one string, and decodes it back into the
 * same list, for any characters. LeetCode splits this into two functions,
 * `encode` and `decode`; here they are methods of one class, like the
 * `Codec` class in the statement.
 *
 * Writes each string as its length, a `#`, and the string itself. Decoding
 * reads a length up to the next `#`, then takes exactly that many
 * characters, so a `#` or digits inside a string are never misread.
 *
 * @see https://leetcode.com/problems/encode-and-decode-strings/
 * @difficulty Medium
 * @timeComplexity O(n) for each operation, where n is the total length
 * @spaceComplexity O(n)
 *
 * @example
 * const codec = new EncodeAndDecodeStrings();
 * codec.encode(["Hello", "World"]); // "5#Hello5#World"
 * codec.decode("5#Hello5#World"); // ["Hello", "World"]
 */
export class EncodeAndDecodeStrings {
	encode(strs: readonly string[]): string {
		return strs.map((str) => `${str.length}#${str}`).join("");
	}

	decode(s: string): string[] {
		const strs: string[] = [];
		for (let i = 0; i < s.length; ) {
			const separator = s.indexOf("#", i);
			const length = Number(s.slice(i, separator));
			strs.push(s.slice(separator + 1, separator + 1 + length));
			i = separator + 1 + length;
		}
		return strs;
	}
}
