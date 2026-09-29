/**
 * 397. Integer Replacement
 *
 * Returns the fewest operations to turn `n` into 1, where an even number can
 * be halved and an odd number can go up or down by one.
 *
 * Greedy on the binary form: halving is always right for an even number.
 * For an odd number, the choice that leaves more trailing zeros (so more
 * halvings follow) is best, which is adding 1 when the last two bits are
 * `11`, except for 3, where subtracting is better.
 *
 * @see https://leetcode.com/problems/integer-replacement/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * integerReplacement(7); // 4: 7 → 8 → 4 → 2 → 1
 */
export const integerReplacement = (n: number): number => {
	let value = n;
	let steps = 0;

	while (value !== 1) {
		if (value % 2 === 0) value /= 2;
		else if (value === 3 || value % 4 === 1) value -= 1;
		else value += 1;
		steps++;
	}

	return steps;
};
