/**
 * 816. Ambiguous Coordinates
 *
 * `s` is a coordinate like `"(1, 23)"` with the comma, spaces and decimal
 * points removed, e.g. `"(123)"`. Returns every original coordinate it
 * could have been, formatted `"(x, y)"`. Numbers never had extra zeros:
 * no leading zeros (except `0` itself or `0.5`), and no trailing zeros
 * after a decimal point.
 *
 * Tries every split into two parts, and for each part every placement of a
 * decimal point (or none) that obeys the zero rules.
 *
 * @see https://leetcode.com/problems/ambiguous-coordinates/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^3) for the output
 *
 * @example
 * ambiguousCoordinates("(123)"); // ["(1, 2.3)", "(1, 23)", "(1.2, 3)", "(12, 3)"]
 */
export const ambiguousCoordinates = (s: string): string[] => {
	const digits = s.slice(1, -1);
	const numbers = (part: string): string[] => {
		const options: string[] = [];
		for (let point = 1; point <= part.length; point++) {
			const whole = part.slice(0, point);
			const fraction = part.slice(point);
			if (whole.length > 1 && whole.startsWith("0")) continue;
			if (fraction.endsWith("0")) continue;
			options.push(fraction === "" ? whole : `${whole}.${fraction}`);
		}
		return options;
	};

	const results: string[] = [];
	for (let split = 1; split < digits.length; split++) {
		for (const x of numbers(digits.slice(0, split))) {
			for (const y of numbers(digits.slice(split)))
				results.push(`(${x}, ${y})`);
		}
	}
	return results;
};
