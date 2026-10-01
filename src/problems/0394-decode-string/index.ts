/**
 * 394. Decode String
 *
 * Decodes a string where `k[text]` means `text` repeated `k` times, and
 * brackets can nest, like `"3[a2[c]]"` for `"accaccacc"`.
 *
 * A stack holds the text built so far and the repeat count for each open
 * bracket. A closing bracket repeats the inner text and appends it to the
 * text outside.
 *
 * @see https://leetcode.com/problems/decode-string/
 * @difficulty Medium
 * @timeComplexity O(output length)
 * @spaceComplexity O(output length)
 *
 * @example
 * decodeString("3[a]2[bc]"); // "aaabcbc"
 */
export const decodeString = (s: string): string => {
	const stack: [outer: string, count: number][] = [];
	let current = "";
	let count = 0;

	for (const char of s) {
		if (char >= "0" && char <= "9") {
			count = count * 10 + Number(char);
		} else if (char === "[") {
			stack.push([current, count]);
			current = "";
			count = 0;
		} else if (char === "]") {
			const [outer, repeat] = stack.pop() ?? ["", 1];
			current = outer + current.repeat(repeat);
		} else {
			current += char;
		}
	}

	return current;
};
