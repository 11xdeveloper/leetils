/**
 * 3145. Find Products of Elements of Big Array
 *
 * The big array lists, for i = 1, 2, 3, …, the powers of two adding up to i
 * in increasing order: [1, 2, 1, 2, 4, 1, 4, …]. Returns, for each query
 * `[from, to, mod]`, the product of its elements from `from` to `to`
 * modulo `mod`.
 *
 * Every element is a power of two, so the product is 2 to the sum of their
 * exponents. Count the elements and exponents contributed by 1 to x bit by
 * bit, binary search for where an index falls, and add the lowest bits of
 * the number it falls in. Indices reach 10¹⁵, so use BigInt.
 *
 * @see https://leetcode.com/problems/find-products-of-elements-of-big-array/
 * @difficulty Hard
 * @timeComplexity O(q log² N)
 * @spaceComplexity O(1)
 *
 * @example
 * findProductsOfElementsOfBigArray([[1, 3, 7]]); // [4]
 */
export const findProductsOfElementsOfBigArray = (
	queries: readonly (readonly number[])[],
): number[] => {
	/** Elements and exponent sum over the big arrays of 1 to x. */
	const totals = (x: bigint): [count: bigint, exponents: bigint] => {
		let count = 0n;
		let exponents = 0n;
		for (let bit = 0n; 1n << bit <= x; bit++) {
			const cycle = 1n << (bit + 1n);
			const half = 1n << bit;
			const remainder = (x + 1n) % cycle;
			const set =
				((x + 1n) / cycle) * half + (remainder > half ? remainder - half : 0n);
			count += set;
			exponents += set * bit;
		}
		return [count, exponents];
	};
	/** Exponent sum of the first `length` elements. */
	const prefix = (length: bigint): bigint => {
		let lo = 0n;
		let hi = length;
		while (lo < hi) {
			const mid = (lo + hi + 1n) / 2n;
			if (totals(mid)[0] <= length) lo = mid;
			else hi = mid - 1n;
		}
		let [count, exponents] = totals(lo);
		const next = lo + 1n;
		for (let bit = 0n; count < length; bit++)
			if ((next >> bit) & 1n) {
				exponents += bit;
				count++;
			}
		return exponents;
	};
	const power = (exponent: bigint, mod: bigint): bigint => {
		let result = 1n % mod;
		let base = 2n % mod;
		for (let e = exponent; e > 0n; e >>= 1n) {
			if (e & 1n) result = (result * base) % mod;
			base = (base * base) % mod;
		}
		return result;
	};
	return queries.map(([from = 0, to = 0, mod = 1]) =>
		Number(power(prefix(BigInt(to) + 1n) - prefix(BigInt(from)), BigInt(mod))),
	);
};
