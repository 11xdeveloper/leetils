/**
 * 421. Maximum XOR of Two Numbers in an Array
 *
 * Returns the largest `nums[i] ^ nums[j]` over all pairs of non-negative
 * integers in `nums`.
 *
 * Builds the answer one bit at a time, from the highest. With the higher
 * bits fixed, it tries setting the next bit: that's possible when two
 * numbers' prefixes XOR to the candidate, which a set of prefixes checks in
 * one pass (if `a ^ b = c`, then `a ^ c = b`).
 *
 * @see https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
 * @difficulty Medium
 * @timeComplexity O(31 n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumXorOfTwoNumbersInAnArray([3, 10, 5, 25, 2, 8]); // 28: 5 ^ 25
 */
export const maximumXorOfTwoNumbersInAnArray = (
	nums: readonly number[],
): number => {
	let best = 0;
	let mask = 0;

	for (let bit = 30; bit >= 0; bit--) {
		mask |= 1 << bit;
		const prefixes = new Set(nums.map((num) => num & mask));
		const candidate = best | (1 << bit);
		for (const prefix of prefixes) {
			if (prefixes.has(prefix ^ candidate)) {
				best = candidate;
				break;
			}
		}
	}

	return best;
};
