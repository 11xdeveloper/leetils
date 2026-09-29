/**
 * 166. Fraction to Recurring Decimal
 *
 * Returns `numerator / denominator` as a decimal string, with any repeating
 * part of the fraction in parentheses, like `"0.(012)"` for 4/333.
 *
 * Long division, remembering where each remainder first appeared. When a
 * remainder repeats, the digits since its first appearance repeat forever.
 *
 * @see https://leetcode.com/problems/fraction-to-recurring-decimal/
 * @difficulty Medium
 * @timeComplexity O(d) where d is the denominator, the most remainders there can be
 * @spaceComplexity O(d)
 *
 * @example
 * fractionToRecurringDecimal(1, 2); // "0.5"
 * fractionToRecurringDecimal(4, 333); // "0.(012)"
 */
export const fractionToRecurringDecimal = (
	numerator: number,
	denominator: number,
): string => {
	if (numerator === 0) return "0";

	const sign = numerator < 0 !== denominator < 0 ? "-" : "";
	const top = Math.abs(numerator);
	const bottom = Math.abs(denominator);
	const whole = `${sign}${Math.floor(top / bottom)}`;

	let remainder = top % bottom;
	if (remainder === 0) return whole;

	const digits: string[] = [];
	const seenAt = new Map<number, number>();
	while (remainder !== 0) {
		const start = seenAt.get(remainder);
		if (start !== undefined) {
			return `${whole}.${digits.slice(0, start).join("")}(${digits.slice(start).join("")})`;
		}
		seenAt.set(remainder, digits.length);
		remainder *= 10;
		digits.push(String(Math.floor(remainder / bottom)));
		remainder %= bottom;
	}

	return `${whole}.${digits.join("")}`;
};
