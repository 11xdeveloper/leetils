/**
 * 2067. Number of Equal Count Substrings
 *
 * Counts the substrings of `s` in which every letter that appears appears
 * exactly `count` times.
 *
 * A qualifying substring with `u` distinct letters has length
 * `u · count`. For each `u` from 1 to 26, slide a window of that length,
 * tracking how many letters appear exactly `count` times.
 *
 * @see https://leetcode.com/problems/number-of-equal-count-substrings/
 * @difficulty Medium
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfEqualCountSubstrings("aaabcbbcc", 3); // 3
 */
export const numberOfEqualCountSubstrings = (
	s: string,
	count: number,
): number => {
	const codes = Array.from(s, (char) => char.charCodeAt(0) - 97);
	let total = 0;
	for (let letters = 1; letters <= 26; letters++) {
		const length = letters * count;
		if (length > s.length) break;
		const counts = new Array<number>(26).fill(0);
		let exact = 0;
		for (const [end, code] of codes.entries()) {
			counts[code] = (counts[code] ?? 0) + 1;
			if (counts[code] === count) exact++;
			else if (counts[code] === count + 1) exact--;
			const leaving = codes[end - length];
			if (leaving !== undefined) {
				if (counts[leaving] === count) exact--;
				counts[leaving] = (counts[leaving] ?? 0) - 1;
				if (counts[leaving] === count) exact++;
			}
			if (end >= length - 1 && exact === letters) total++;
		}
	}
	return total;
};
