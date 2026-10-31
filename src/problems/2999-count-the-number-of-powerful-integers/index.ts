/**
 * 2999. Count the Number of Powerful Integers
 *
 * A powerful integer ends with the digit string `s` and has no digit
 * above `limit`. Returns how many lie in `[start, finish]`.
 *
 * Count powerful integers up to a bound: walk the bound's digits before
 * the suffix, adding every smaller allowed digit times the free choices
 * after it, until a digit above `limit` cuts the tight path off.
 *
 * @see https://leetcode.com/problems/count-the-number-of-powerful-integers/
 * @difficulty Hard
 * @timeComplexity O(log finish)
 * @spaceComplexity O(log finish)
 *
 * @example
 * countTheNumberOfPowerfulIntegers(1, 6000, 4, "124"); // 5
 */
export const countTheNumberOfPowerfulIntegers = (
	start: number,
	finish: number,
	limit: number,
	s: string,
): number => {
	const upTo = (bound: number): number => {
		const digits = String(bound);
		if (digits.length < s.length) return 0;
		const free = digits.length - s.length;
		let count = 0;
		for (let i = 0; i < free; i++) {
			const digit = Number(digits.charAt(i));
			count += Math.min(digit, limit + 1) * (limit + 1) ** (free - i - 1);
			if (digit > limit) return count;
		}
		return count + (digits.slice(free) >= s ? 1 : 0);
	};
	return upTo(finish) - upTo(start - 1);
};
