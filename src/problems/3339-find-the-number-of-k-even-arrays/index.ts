const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3339. Find the Number of K-Even Arrays
 *
 * Count the arrays of length `n` with values from 1 to `m` that have
 * exactly `k` neighbouring pairs where `a · b - a - b` is even, modulo
 * 10⁹ + 7.
 *
 * `a · b - a - b` is even exactly when a and b are both even. Dynamic
 * programming over the positions, the number of such pairs so far and
 * whether the last value is even.
 *
 * @see https://leetcode.com/problems/find-the-number-of-k-even-arrays/
 * @difficulty Medium
 * @timeComplexity O(n · k)
 * @spaceComplexity O(k)
 *
 * @example
 * findTheNumberOfKEvenArrays(3, 4, 2); // 8
 */
export const findTheNumberOfKEvenArrays = (
	n: number,
	m: number,
	k: number,
): number => {
	const evens = Math.floor(m / 2);
	const odds = m - evens;
	let endOdd = new Array<number>(k + 1).fill(0);
	let endEven = new Array<number>(k + 1).fill(0);
	endOdd[0] = odds;
	endEven[0] = evens;
	for (let i = 1; i < n; i++) {
		const nextOdd = new Array<number>(k + 1).fill(0);
		const nextEven = new Array<number>(k + 1).fill(0);
		for (let pairs = 0; pairs <= k; pairs++) {
			const both = ((endOdd[pairs] ?? 0) + (endEven[pairs] ?? 0)) % MOD;
			nextOdd[pairs] = multiply(both, odds);
			nextEven[pairs] =
				(nextEven[pairs] ?? 0) + multiply(endOdd[pairs] ?? 0, evens);
			if (pairs + 1 <= k)
				nextEven[pairs + 1] = multiply(endEven[pairs] ?? 0, evens);
			nextEven[pairs] = (nextEven[pairs] ?? 0) % MOD;
		}
		endOdd = nextOdd;
		endEven = nextEven;
	}
	return ((endOdd[k] ?? 0) + (endEven[k] ?? 0)) % MOD;
};
