/**
 * 878. Nth Magical Number
 *
 * A magical number is divisible by `a` or `b`. Returns the `n`th magical
 * number (from 1), modulo 10^9 + 7.
 *
 * Binary search on the value: the magical numbers up to `x` number
 * `⌊x/a⌋ + ⌊x/b⌋ - ⌊x/lcm⌋`. The answer, at most `n · min(a, b)`, stays well
 * within exact integer range.
 *
 * @see https://leetcode.com/problems/nth-magical-number/
 * @difficulty Hard
 * @timeComplexity O(log(n · min(a, b)))
 * @spaceComplexity O(1)
 *
 * @example
 * nthMagicalNumber(4, 2, 3); // 6: 2, 3, 4, 6
 */
export const nthMagicalNumber = (n: number, a: number, b: number): number => {
	const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
	const lcm = (a / gcd(a, b)) * b;
	let low = 1;
	let high = n * Math.min(a, b);
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm) >= n)
			high = mid;
		else low = mid + 1;
	}
	return low % 1_000_000_007;
};
