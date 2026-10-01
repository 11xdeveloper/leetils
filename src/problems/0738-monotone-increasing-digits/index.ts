/**
 * 738. Monotone Increasing Digits
 *
 * Returns the largest number at most `n` whose digits never decrease from
 * left to right.
 *
 * At the first place a digit is bigger than the next, the prefix has to
 * drop. It lowers that digit by one (moving left while that breaks the
 * order with the digit before) and fills everything after with 9s.
 *
 * @see https://leetcode.com/problems/monotone-increasing-digits/
 * @difficulty Medium
 * @timeComplexity O(d) for d digits
 * @spaceComplexity O(d)
 *
 * @example
 * monotoneIncreasingDigits(332); // 299
 */
export const monotoneIncreasingDigits = (n: number): number => {
	const digits = [...String(n)].map(Number);
	let drop = digits.findIndex((digit, i) => digit > (digits[i + 1] ?? 9));
	if (drop === -1) return n;

	while (drop > 0 && digits[drop - 1] === digits[drop]) drop--;
	digits[drop] = (digits[drop] ?? 1) - 1;
	digits.fill(9, drop + 1);
	return Number(digits.join(""));
};
