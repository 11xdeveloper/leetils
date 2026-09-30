/**
 * 762. Prime Number of Set Bits in Binary Representation
 *
 * Counts the numbers from `left` to `right` whose binary representation has
 * a prime number of 1 bits.
 *
 * Numbers up to 10^6 have at most 20 set bits, so the primes to check are
 * fixed: 2, 3, 5, 7, 11, 13, 17 and 19, kept as a bitmask.
 *
 * @see https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation/
 * @difficulty Easy
 * @timeComplexity O((right - left) · log right)
 * @spaceComplexity O(1)
 *
 * @example
 * primeNumberOfSetBitsInBinaryRepresentation(6, 10); // 4
 */
export const primeNumberOfSetBitsInBinaryRepresentation = (
	left: number,
	right: number,
): number => {
	const primes =
		(1 << 2) |
		(1 << 3) |
		(1 << 5) |
		(1 << 7) |
		(1 << 11) |
		(1 << 13) |
		(1 << 17) |
		(1 << 19);
	let count = 0;
	for (let num = left; num <= right; num++) {
		let bits = 0;
		for (let rest = num; rest; rest &= rest - 1) bits++;
		if (primes & (1 << bits)) count++;
	}
	return count;
};
