/**
 * 3765. Complete Prime Number
 *
 * Whether every prefix and every suffix of `num`'s digits, read as a
 * number, is prime.
 *
 * @see https://leetcode.com/problems/complete-prime-number/
 * @difficulty Medium
 * @timeComplexity O(d · √num), for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * completePrimeNumber(23); // true
 */
export const completePrimeNumber = (num: number): boolean => {
	const isPrime = (x: number): boolean => {
		if (x < 2) return false;
		for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
		return true;
	};
	const digits = String(num);
	for (let i = 1; i <= digits.length; i++)
		if (
			!isPrime(Number(digits.slice(0, i))) ||
			!isPrime(Number(digits.slice(digits.length - i)))
		)
			return false;
	return true;
};
