/**
 * 848. Shifting Letters
 *
 * `shifts[i]` shifts each of the first `i + 1` letters of `s` forward in the
 * alphabet that many places (wrapping from z to a). Returns the result.
 *
 * Letter `i` is shifted by the sum of `shifts[i..]`, a suffix sum, reduced
 * modulo 26 as it goes so it never grows large.
 *
 * @see https://leetcode.com/problems/shifting-letters/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * shiftingLetters("abc", [3, 5, 9]); // "rpl"
 */
export const shiftingLetters = (
	s: string,
	shifts: readonly number[],
): string => {
	const letters = [...s];
	let shift = 0;
	for (let i = letters.length - 1; i >= 0; i--) {
		shift = (shift + (shifts[i] ?? 0)) % 26;
		letters[i] = String.fromCharCode(
			((s.charCodeAt(i) - 97 + shift) % 26) + 97,
		);
	}
	return letters.join("");
};
