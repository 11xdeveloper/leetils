/**
 * 1012. Numbers With Repeated Digits
 *
 * Counts the integers from 1 to `n` that have at least one repeated digit.
 *
 * Counts the complement, numbers with all digits distinct: those shorter
 * than `n` by permutation counting, and those as long as `n` by fixing a
 * longer and longer prefix of `n` and filling the rest freely.
 *
 * @see https://leetcode.com/problems/numbers-with-repeated-digits/
 * @difficulty Hard
 * @timeComplexity O(d^2) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * numbersWithRepeatedDigits(100); // 10
 */
export const numbersWithRepeatedDigits = (n: number): number => {
	const digits = [...String(n + 1)].map(Number);
	const length = digits.length;
	// Arrangements of k digits chosen in order from `available` unused ones.
	const arrangements = (available: number, k: number): number => {
		let result = 1;
		for (let i = 0; i < k; i++) result *= available - i;
		return result;
	};

	// Distinct-digit numbers below n + 1.
	let distinct = 0;
	for (let shorter = 1; shorter < length; shorter++)
		distinct += 9 * arrangements(9, shorter - 1);
	const used = new Set<number>();
	for (const [i, digit] of digits.entries()) {
		for (let smaller = i === 0 ? 1 : 0; smaller < digit; smaller++) {
			if (!used.has(smaller)) distinct += arrangements(9 - i, length - i - 1);
		}
		if (used.has(digit)) break;
		used.add(digit);
	}
	return n - distinct;
};
