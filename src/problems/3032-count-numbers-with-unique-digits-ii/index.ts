/**
 * 3032. Count Numbers With Unique Digits II
 *
 * How many numbers from `a` to `b` have no repeated digit.
 *
 * The range is at most 1000 wide, so check each number's digits with a
 * bitmask.
 *
 * @see https://leetcode.com/problems/count-numbers-with-unique-digits-ii/
 * @difficulty Easy
 * @timeComplexity O((b - a) log b)
 * @spaceComplexity O(1)
 *
 * @example
 * countNumbersWithUniqueDigitsII(1, 20); // 19
 */
export const countNumbersWithUniqueDigitsII = (
	a: number,
	b: number,
): number => {
	let count = 0;
	for (let num = a; num <= b; num++) {
		let seen = 0;
		let unique = true;
		for (let rest = num; rest > 0 && unique; rest = Math.floor(rest / 10)) {
			const bit = 1 << (rest % 10);
			unique = (seen & bit) === 0;
			seen |= bit;
		}
		if (unique) count++;
	}
	return count;
};
