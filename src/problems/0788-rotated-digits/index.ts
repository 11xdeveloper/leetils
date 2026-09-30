/**
 * 788. Rotated Digits
 *
 * A number is good if rotating each digit 180° gives valid digits (0, 1
 * and 8 stay; 2↔5 and 6↔9 swap; 3, 4 and 7 break) and a different number.
 * Counts the good numbers from 1 to `n`.
 *
 * A number is good when every digit rotates and at least one of them
 * changes, which is checked digit by digit.
 *
 * @see https://leetcode.com/problems/rotated-digits/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(1)
 *
 * @example
 * rotatedDigits(10); // 4: 2, 5, 6 and 9
 */
export const rotatedDigits = (n: number): number => {
	// 0: stays the same, 1: changes, 2: invalid.
	const kind = [0, 0, 1, 2, 2, 1, 1, 2, 0, 1];
	let count = 0;
	for (let num = 1; num <= n; num++) {
		let changes = false;
		let valid = true;
		for (let rest = num; rest > 0 && valid; rest = Math.floor(rest / 10)) {
			const digitKind = kind[rest % 10];
			if (digitKind === 2) valid = false;
			if (digitKind === 1) changes = true;
		}
		if (valid && changes) count++;
	}
	return count;
};
