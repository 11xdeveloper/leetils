/**
 * 2571. Minimum Operations to Reduce an Integer to 0
 *
 * Each operation adds or subtracts a power of two. Returns the fewest
 * operations that bring `n` to 0.
 *
 * Read the bits from the bottom: a lone 1 is subtracted, but a run of
 * 1s is cheaper to clear by adding 1, which carries it into one higher
 * bit.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-reduce-an-integer-to-0/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumOperationsToReduceAnIntegerTo0(39); // 3
 */
export const minimumOperationsToReduceAnIntegerTo0 = (n: number): number => {
	let operations = 0;
	while (n > 0) {
		if ((n & 3) === 3) {
			n++;
			operations++;
		} else if (n & 1) {
			n--;
			operations++;
		} else n >>= 1;
	}
	return operations;
};
