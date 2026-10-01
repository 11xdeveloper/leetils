/**
 * 507. Perfect Number
 *
 * Returns whether `num` equals the sum of its positive divisors other than
 * itself.
 *
 * Divisors come in pairs `d` and `num / d` with `d ≤ √num`, so it only
 * searches up to the square root, taking care not to count a square root
 * twice.
 *
 * @see https://leetcode.com/problems/perfect-number/
 * @difficulty Easy
 * @timeComplexity O(√num)
 * @spaceComplexity O(1)
 *
 * @example
 * perfectNumber(28); // true: 1 + 2 + 4 + 7 + 14 = 28
 */
export const perfectNumber = (num: number): boolean => {
	if (num <= 1) return false;
	let sum = 1;
	for (let d = 2; d * d <= num; d++) {
		if (num % d !== 0) continue;
		sum += d;
		if (d * d !== num) sum += num / d;
	}
	return sum === num;
};
