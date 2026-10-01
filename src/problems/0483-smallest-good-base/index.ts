/**
 * 483. Smallest Good Base
 *
 * A good base of `n` is a base `k ≥ 2` in which `n` is written with only 1s.
 * Given `n` as a decimal string, returns its smallest good base, also as a
 * string.
 *
 * `n` written as `m` ones in base `k` is `1 + k + … + k^(m-1)`, so `k` is
 * just under the `(m - 1)`th root of `n`. More digits means a smaller base,
 * so it tries every digit count from the most possible (about `log2 n`)
 * down, checking the integers around that root exactly with `BigInt`. Two
 * digits always work with `k = n - 1`.
 *
 * @see https://leetcode.com/problems/smallest-good-base/
 * @difficulty Hard
 * @timeComplexity O(log^2 n)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestGoodBase("13"); // "3": 13 is 111 in base 3
 */
export const smallestGoodBase = (n: string): string => {
	const value = BigInt(n);
	const approximate = Number(n);

	for (
		let digits = Math.floor(Math.log2(approximate + 1));
		digits >= 3;
		digits--
	) {
		const root = Math.floor(approximate ** (1 / (digits - 1)));
		for (
			let base = BigInt(Math.max(2, root - 1));
			base <= BigInt(root + 1);
			base++
		) {
			let sum = 0n;
			for (
				let i = 0, power = 1n;
				i < digits && sum <= value;
				i++, power *= base
			)
				sum += power;
			if (sum === value) return String(base);
		}
	}

	return String(value - 1n);
};
