/**
 * 320. Generalized Abbreviation
 *
 * Returns every generalized abbreviation of `word`: any set of
 * non-overlapping, non-adjacent substrings replaced by their lengths, like
 * `"a3e"` or `"1bcd1"` for "abcde".
 *
 * Each letter is either kept or abbreviated, so there are 2^n choices, and
 * merging each run of abbreviated letters into one number keeps the
 * replaced substrings non-adjacent automatically.
 *
 * @see https://leetcode.com/problems/generalized-abbreviation/
 * @difficulty Medium
 * @timeComplexity O(n * 2^n)
 * @spaceComplexity O(n * 2^n) for the returned abbreviations
 *
 * @example
 * generalizedAbbreviation("ab"); // ["ab", "1b", "a1", "2"]
 */
export const generalizedAbbreviation = (word: string): string[] => {
	const abbreviations: string[] = [];

	for (let mask = 0; mask < 1 << word.length; mask++) {
		let abbreviation = "";
		let run = 0;
		for (let i = 0; i < word.length; i++) {
			if (mask & (1 << i)) {
				run++;
			} else {
				if (run > 0) abbreviation += run;
				abbreviation += word.charAt(i);
				run = 0;
			}
		}
		if (run > 0) abbreviation += run;
		abbreviations.push(abbreviation);
	}

	return abbreviations;
};
