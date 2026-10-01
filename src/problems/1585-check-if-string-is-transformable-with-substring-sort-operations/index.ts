/**
 * 1585. Check If String Is Transformable With Substring Sort Operations
 *
 * An operation sorts any substring of the digit string `s` in place.
 * Returns whether `s` can be turned into `t`.
 *
 * Sorting only ever moves a digit left past larger digits. So build `t`
 * from the left: each digit must come from the earliest remaining copy in
 * `s`, and no smaller digit may still be waiting in front of it.
 *
 * @see https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations/
 * @difficulty Hard
 * @timeComplexity O(10n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfStringIsTransformableWithSubstringSortOperations("84532", "34852"); // true
 */
export const checkIfStringIsTransformableWithSubstringSortOperations = (
	s: string,
	t: string,
): boolean => {
	const positions = Array.from({ length: 10 }, (): number[] => []);
	for (let i = 0; i < s.length; i++) positions[Number(s[i])]?.push(i);
	const next = new Array<number>(10).fill(0);
	for (const char of t) {
		const digit = Number(char);
		const position = positions[digit]?.[next[digit] ?? 0];
		if (position === undefined) return false;
		for (let smaller = 0; smaller < digit; smaller++) {
			if ((positions[smaller]?.[next[smaller] ?? 0] ?? Infinity) < position)
				return false;
		}
		next[digit] = (next[digit] ?? 0) + 1;
	}
	return true;
};
