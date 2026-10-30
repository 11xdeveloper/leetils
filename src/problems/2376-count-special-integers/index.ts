/**
 * 2376. Count Special Integers
 *
 * Counts the integers from 1 to `n` whose digits are all distinct.
 *
 * Shorter numbers count by permutations. For `n`'s length, fix a prefix
 * of `n` and choose a smaller unused next digit, then permute the rest.
 *
 * @see https://leetcode.com/problems/count-special-integers/
 * @difficulty Hard
 * @timeComplexity O(d^2) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * countSpecialIntegers(135); // 110
 */
export const countSpecialIntegers = (n: number): number => {
	const digits = [...String(n)].map(Number);
	const d = digits.length;
	/** Ways to fill `slots` positions from `available` unused digits. */
	const arrangements = (available: number, slots: number): number => {
		let ways = 1;
		for (let i = 0; i < slots; i++) ways *= available - i;
		return ways;
	};
	let count = 0;
	for (let length = 1; length < d; length++)
		count += 9 * arrangements(9, length - 1);
	const used = new Set<number>();
	for (const [i, digit] of digits.entries()) {
		for (let smaller = i === 0 ? 1 : 0; smaller < digit; smaller++)
			if (!used.has(smaller)) count += arrangements(9 - i, d - i - 1);
		if (used.has(digit)) return count;
		used.add(digit);
	}
	return count + 1;
};
