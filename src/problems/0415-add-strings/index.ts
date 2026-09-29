/**
 * 415. Add Strings
 *
 * Returns the sum of two non-negative integers written as strings, as a
 * string, without converting them to numbers.
 *
 * Adds digits from the right like column addition, carrying into the next
 * column.
 *
 * @see https://leetcode.com/problems/add-strings/
 * @difficulty Easy
 * @timeComplexity O(max(m, n))
 * @spaceComplexity O(max(m, n)) for the returned string
 *
 * @example
 * addStrings("456", "77"); // "533"
 */
export const addStrings = (num1: string, num2: string): string => {
	const digits: number[] = [];
	let carry = 0;

	for (
		let i = num1.length - 1, j = num2.length - 1;
		i >= 0 || j >= 0 || carry > 0;
		i--, j--
	) {
		const sum =
			(i >= 0 ? num1.charCodeAt(i) - 48 : 0) +
			(j >= 0 ? num2.charCodeAt(j) - 48 : 0) +
			carry;
		digits.push(sum % 10);
		carry = sum >= 10 ? 1 : 0;
	}

	return digits.reverse().join("");
};
