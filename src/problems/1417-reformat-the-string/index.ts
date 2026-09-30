/**
 * 1417. Reformat The String
 *
 * Rearranges the letters and digits of `s` so no two of the same kind are
 * next to each other, or returns `""` if that's impossible.
 *
 * Possible exactly when the counts differ by at most one; then alternate,
 * starting with the more numerous kind.
 *
 * @see https://leetcode.com/problems/reformat-the-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * reformatTheString("a0b1c2"); // "a0b1c2"
 */
export const reformatTheString = (s: string): string => {
	const digits = [...s].filter((char) => char >= "0" && char <= "9");
	const letters = [...s].filter((char) => !(char >= "0" && char <= "9"));
	if (Math.abs(digits.length - letters.length) > 1) return "";
	const [first, second] =
		digits.length > letters.length ? [digits, letters] : [letters, digits];
	return first.map((char, i) => char + (second[i] ?? "")).join("");
};
