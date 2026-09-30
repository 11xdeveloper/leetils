/**
 * 1291. Sequential Digits
 *
 * Returns, in order, the numbers from `low` to `high` whose digits each go
 * up by one from the last (like 1234).
 *
 * There are only 36 such numbers: every run of consecutive digits from
 * "123456789". Listing them by length and then by starting digit gives
 * them in increasing order.
 *
 * @see https://leetcode.com/problems/sequential-digits/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * sequentialDigits(100, 300); // [123, 234]
 */
export const sequentialDigits = (low: number, high: number): number[] => {
	const digits = "123456789";
	const result: number[] = [];
	for (let length = 2; length <= 9; length++) {
		for (let start = 0; start + length <= 9; start++) {
			const value = Number(digits.slice(start, start + length));
			if (value >= low && value <= high) result.push(value);
		}
	}
	return result;
};
