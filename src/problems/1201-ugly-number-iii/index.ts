/**
 * 1201. Ugly Number III
 *
 * An ugly number is a positive integer divisible by `a`, `b` or `c`. Returns
 * the `n`th ugly number (at most 2 · 10^9).
 *
 * Binary searches for the smallest `x` with at least `n` ugly numbers up to
 * it, counting them by inclusion–exclusion over `a`, `b`, `c` and their
 * least common multiples. Multiples past the search range can't divide
 * anything in it, so those count as infinite.
 *
 * @see https://leetcode.com/problems/ugly-number-iii/
 * @difficulty Medium
 * @timeComplexity O(log(max) + log(a + b + c))
 * @spaceComplexity O(1)
 *
 * @example
 * uglyNumberIII(4, 2, 3, 4); // 6
 */
export const uglyNumberIII = (
	n: number,
	a: number,
	b: number,
	c: number,
): number => {
	const LIMIT = 2 * 10 ** 9;
	const gcd = (x: number, y: number): number => {
		while (y !== 0) [x, y] = [y, x % y];
		return x;
	};
	const lcm = (x: number, y: number) => {
		if (x > LIMIT || y > LIMIT) return Infinity;
		const multiple = (x / gcd(x, y)) * y;
		return multiple > LIMIT ? Infinity : multiple;
	};
	const [ab, bc, ca] = [lcm(a, b), lcm(b, c), lcm(c, a)];
	const abc = lcm(ab, c);
	const count = (x: number) =>
		Math.floor(x / a) +
		Math.floor(x / b) +
		Math.floor(x / c) -
		Math.floor(x / ab) -
		Math.floor(x / bc) -
		Math.floor(x / ca) +
		Math.floor(x / abc);
	let [low, high] = [1, LIMIT];
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (count(mid) >= n) high = mid;
		else low = mid + 1;
	}
	return low;
};
