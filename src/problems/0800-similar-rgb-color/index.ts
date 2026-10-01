/**
 * 800. Similar RGB Color
 *
 * Returns the colour with a shorthand form (`"#XYZ"`, i.e. each component a
 * repeated hex digit) that is most similar to `color`, where similarity is
 * minus the sum of squared differences of the components.
 *
 * The components are independent, and a repeated digit `dd` is `17 · d`, so
 * each component rounds to the nearest multiple of 17.
 *
 * @see https://leetcode.com/problems/similar-rgb-color/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * similarRgbColor("#09f166"); // "#11ee66"
 */
export const similarRgbColor = (color: string): string => {
	let result = "#";
	for (let i = 1; i < 7; i += 2) {
		const digit = Math.round(
			Number.parseInt(color.slice(i, i + 2), 16) / 17,
		).toString(16);
		result += digit + digit;
	}
	return result;
};
