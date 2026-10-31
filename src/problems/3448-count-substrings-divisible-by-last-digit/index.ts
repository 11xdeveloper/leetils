/**
 * 3448. Count Substrings Divisible By Last Digit
 *
 * Count the substrings of the digit string `s` that are divisible by their
 * last digit (which must be non-zero).
 *
 * For every divisor d from 1 to 9, keep how many substrings ending at the
 * current position leave each remainder mod d. Appending a digit maps
 * remainder r to (10r + digit) mod d. Count the ones ending in d with
 * remainder 0.
 *
 * @see https://leetcode.com/problems/count-substrings-divisible-by-last-digit/
 * @difficulty Hard
 * @timeComplexity O(81 n)
 * @spaceComplexity O(1)
 *
 * @example
 * countSubstringsDivisibleByLastDigit("12936"); // 11
 */
export const countSubstringsDivisibleByLastDigit = (s: string): number => {
	let counts = Array.from({ length: 10 }, (_, d) =>
		new Array<number>(d).fill(0),
	);
	let total = 0;
	for (const char of s) {
		const digit = Number(char);
		counts = counts.map((byRemainder, d) => {
			const next = new Array<number>(d).fill(0);
			byRemainder.forEach((count, r) => {
				const to = (10 * r + digit) % d;
				next[to] = (next[to] ?? 0) + count;
			});
			if (d > 0) next[digit % d] = (next[digit % d] ?? 0) + 1;
			return next;
		});
		if (digit > 0) total += counts[digit]?.[0] ?? 0;
	}
	return total;
};
