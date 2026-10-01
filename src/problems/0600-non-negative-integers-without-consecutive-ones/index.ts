/**
 * 600. Non-negative Integers without Consecutive Ones
 *
 * Counts the integers from 0 to `n` whose binary representation has no two
 * adjacent 1s.
 *
 * `k`-bit strings with no adjacent 1s number `F(k + 2)`, a Fibonacci number.
 * Reading `n` from its top bit, each 1 bit contributes the numbers that
 * have a 0 there instead, with any valid bits below it. It stops at two
 * adjacent 1s, since everything with that prefix is invalid; otherwise `n`
 * itself counts too.
 *
 * @see https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(log n)
 *
 * @example
 * nonNegativeIntegersWithoutConsecutiveOnes(5); // 5: 0, 1, 2, 4 and 5
 */
export const nonNegativeIntegersWithoutConsecutiveOnes = (
	n: number,
): number => {
	// valid[k] counts k-bit strings with no adjacent 1s.
	const valid = [1, 2];
	for (let k = 2; k <= 31; k++)
		valid.push((valid[k - 1] ?? 0) + (valid[k - 2] ?? 0));

	let count = 0;
	let previousBit = 0;
	for (let bit = 30; bit >= 0; bit--) {
		if (((n >> bit) & 1) === 0) {
			previousBit = 0;
			continue;
		}
		count += valid[bit] ?? 0;
		if (previousBit === 1) return count;
		previousBit = 1;
	}

	return count + 1;
};
