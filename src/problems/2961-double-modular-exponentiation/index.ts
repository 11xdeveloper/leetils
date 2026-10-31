/**
 * 2961. Double Modular Exponentiation
 *
 * Returns the indices `i` where `((a^b mod 10)^c) mod m` equals `target`,
 * for `variables[i] = [a, b, c, m]`.
 *
 * Fast modular exponentiation, twice.
 *
 * @see https://leetcode.com/problems/double-modular-exponentiation/
 * @difficulty Medium
 * @timeComplexity O(n log(b + c))
 * @spaceComplexity O(n)
 *
 * @example
 * doubleModularExponentiation([[2, 3, 3, 10], [3, 3, 3, 1], [6, 1, 1, 4]], 2); // [0, 2]
 */
export const doubleModularExponentiation = (
	variables: readonly (readonly number[])[],
	target: number,
): number[] => {
	const power = (base: number, exponent: number, mod: number): number => {
		let result = 1 % mod;
		base %= mod;
		for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
			if (exponent % 2 === 1) result = (result * base) % mod;
			base = (base * base) % mod;
		}
		return result;
	};
	return variables.flatMap(([a = 0, b = 0, c = 0, m = 1], i) =>
		power(power(a, b, 10), c, m) === target ? [i] : [],
	);
};
