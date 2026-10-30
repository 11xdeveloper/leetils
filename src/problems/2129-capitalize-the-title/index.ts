/**
 * 2129. Capitalize the Title
 *
 * Lower-cases words of one or two letters and capitalises the rest.
 *
 * Transform each word.
 *
 * @see https://leetcode.com/problems/capitalize-the-title/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * capitalizeTheTitle("First leTTeR of EACH Word"); // "First Letter of Each Word"
 */
export const capitalizeTheTitle = (title: string): string =>
	title
		.split(" ")
		.map((word) => {
			const lower = word.toLowerCase();
			return lower.length <= 2
				? lower
				: lower.charAt(0).toUpperCase() + lower.slice(1);
		})
		.join(" ");
