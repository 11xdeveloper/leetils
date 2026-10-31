/**
 * 2116. Check if a Parentheses String Can Be Valid
 *
 * Characters of `s` whose `locked` digit is "0" may be changed to either
 * parenthesis. Returns whether `s` can be made a valid parentheses string.
 *
 * The length must be even. Scanning left to right, the closing locked
 * parentheses must never outnumber everything else; scanning right to
 * left, likewise for the opening ones.
 *
 * @see https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfAParenthesesStringCanBeValid("))()))", "010100"); // true
 */
export const checkIfAParenthesesStringCanBeValid = (
	s: string,
	locked: string,
): boolean => {
	const n = s.length;
	if (n % 2) return false;
	let balance = 0;
	for (let i = 0; i < n; i++) {
		balance += locked[i] === "0" || s[i] === "(" ? 1 : -1;
		if (balance < 0) return false;
	}
	balance = 0;
	for (let i = n - 1; i >= 0; i--) {
		balance += locked[i] === "0" || s[i] === ")" ? 1 : -1;
		if (balance < 0) return false;
	}
	return true;
};
