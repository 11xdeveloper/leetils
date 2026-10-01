/**
 * 1933. Check if String Is Decomposable Into Value-Equal Substrings
 *
 * Returns whether the digit string `s` splits into runs of one repeated
 * digit, all of length 3 except exactly one of length 2.
 *
 * Each maximal run of equal digits must split into 3s alone, or 3s plus
 * one 2; exactly one run may need the 2.
 *
 * @see https://leetcode.com/problems/check-if-string-is-decomposable-into-value-equal-substrings/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfStringIsDecomposableIntoValueEqualSubstrings("00011111222"); // true
 */
export const checkIfStringIsDecomposableIntoValueEqualSubstrings = (
	s: string,
): boolean => {
	let twos = 0;
	for (let start = 0; start < s.length; ) {
		let end = start;
		while (end < s.length && s[end] === s[start]) end++;
		const remainder = (end - start) % 3;
		if (remainder === 1) return false;
		if (remainder === 2) twos++;
		start = end;
	}
	return twos === 1;
};
