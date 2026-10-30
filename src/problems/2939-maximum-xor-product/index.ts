/**
 * 2939. Maximum Xor Product
 *
 * Returns the largest `(a XOR x) · (b XOR x)` over `0 <= x < 2ⁿ`, modulo
 * 1e9 + 7.
 *
 * Bits from `n` up can't change. Below that, going from the top: where
 * `a` and `b` agree, give both a 1; where they differ, one gets the 1, so
 * give it to whichever is smaller so far, keeping them close. Values
 * reach 2⁵⁰, so use BigInt.
 *
 * @see https://leetcode.com/problems/maximum-xor-product/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumXorProduct(12, 5, 4); // 98
 */
export const maximumXorProduct = (a: number, b: number, n: number): number => {
	const low = (1n << BigInt(n)) - 1n;
	let x = BigInt(a) & ~low;
	let y = BigInt(b) & ~low;
	for (let bit = n - 1; bit >= 0; bit--) {
		const mask = 1n << BigInt(bit);
		const aBit = (BigInt(a) & mask) !== 0n;
		const bBit = (BigInt(b) & mask) !== 0n;
		if (aBit === bBit) {
			x |= mask;
			y |= mask;
		} else if (x <= y) x |= mask;
		else y |= mask;
	}
	return Number(((x % 1_000_000_007n) * (y % 1_000_000_007n)) % 1_000_000_007n);
};
