/**
 * 1073. Adding Two Negabinary Numbers
 *
 * Adds two numbers written in base -2 (bits most significant first) and
 * returns the sum in the same form, without leading zeros.
 *
 * Adds bit by bit from the right. In base -2 a carry into the next place is
 * worth `-1` there, so a column total of `s` leaves bit `s & 1` and carries
 * `-(s >> 1)`.
 *
 * @see https://leetcode.com/problems/adding-two-negabinary-numbers/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(m + n)
 *
 * @example
 * addingTwoNegabinaryNumbers([1, 1, 1, 1, 1], [1, 0, 1]); // [1, 0, 0, 0, 0]
 */
export const addingTwoNegabinaryNumbers = (
	arr1: readonly number[],
	arr2: readonly number[],
): number[] => {
	const result: number[] = [];
	let carry = 0;
	for (
		let i = arr1.length - 1, j = arr2.length - 1;
		i >= 0 || j >= 0 || carry !== 0;
		i--, j--
	) {
		const sum = (arr1[i] ?? 0) + (arr2[j] ?? 0) + carry;
		result.push(sum & 1);
		carry = -(sum >> 1);
	}
	while (result.length > 1 && result.at(-1) === 0) result.pop();
	return result.reverse();
};
