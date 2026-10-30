/**
 * 2434. Using a Robot to Print the Lexicographically Smallest String
 *
 * A robot moves the first letter of `s` onto the end of its string `t`, or
 * writes the last letter of `t` on paper. Returns the smallest string it
 * can write once both are empty.
 *
 * `t` is a stack. Write its top whenever no smaller letter remains in `s`
 * (tracked with counts of the letters left).
 *
 * @see https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string/
 * @difficulty Medium
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * usingARobotToPrintTheLexicographicallySmallestString("bdda"); // "addb"
 */
export const usingARobotToPrintTheLexicographicallySmallestString = (
	s: string,
): string => {
	const left = new Array<number>(26).fill(0);
	for (const char of s) {
		const code = char.charCodeAt(0) - 97;
		left[code] = (left[code] ?? 0) + 1;
	}
	let smallest = 0;
	const stack: string[] = [];
	let paper = "";
	for (const char of s) {
		const code = char.charCodeAt(0) - 97;
		left[code] = (left[code] ?? 0) - 1;
		stack.push(char);
		while (smallest < 26 && !left[smallest]) smallest++;
		while (stack.length && (stack.at(-1) ?? "").charCodeAt(0) - 97 <= smallest)
			paper += stack.pop();
	}
	return paper + stack.reverse().join("");
};
