/**
 * 3461. Check If Digits Are Equal in String After Operations I
 *
 * Repeatedly replace the digit string with the sums mod 10 of neighbouring
 * digits until two digits remain. Returns whether they're equal.
 *
 * Simulate.
 *
 * @see https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i/
 * @difficulty Easy
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfDigitsAreEqualInStringAfterOperationsI("3902"); // true
 */
export const checkIfDigitsAreEqualInStringAfterOperationsI = (
	s: string,
): boolean => {
	let digits = [...s].map(Number);
	while (digits.length > 2)
		digits = digits.slice(1).map((d, i) => (d + (digits[i] ?? 0)) % 10);
	return digits[0] === digits[1];
};
