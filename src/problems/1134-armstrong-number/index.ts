/**
 * 1134. Armstrong Number
 *
 * A k-digit number is an Armstrong number if the kth powers of its digits
 * add up to it. Returns whether `n` is one.
 *
 * Sums the powers of the digits directly.
 *
 * @see https://leetcode.com/problems/armstrong-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * armstrongNumber(153); // true
 */
export const armstrongNumber = (n: number): boolean => {
	const k = String(n).length;
	let sum = 0;
	for (let rest = n; rest > 0; rest = Math.floor(rest / 10)) {
		sum += (rest % 10) ** k;
	}
	return sum === n;
};
