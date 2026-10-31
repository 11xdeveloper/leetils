/**
 * 2060. Check if an Original String Exists Given Two Encoded Strings
 *
 * A string is encoded by splitting it into substrings and replacing some
 * of them by their lengths. Returns whether some string could encode to
 * both `s1` and `s2` (runs of at most three digits).
 *
 * Walk both encodings together, tracking `diff`: how many characters one
 * side's numbers have covered beyond the other. A run of digits may be
 * read as any split of numbers; a letter cancels one pending wildcard on
 * the other side, or must match a letter there when nothing is pending.
 * Memoise the failing states.
 *
 * @see https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings/
 * @difficulty Hard
 * @timeComplexity O(n · m · D) for D possible differences
 * @spaceComplexity O(n · m · D)
 *
 * @example
 * checkIfAnOriginalStringExistsGivenTwoEncodedStrings("internationalization", "i18n"); // true
 */
export const checkIfAnOriginalStringExistsGivenTwoEncodedStrings = (
	s1: string,
	s2: string,
): boolean => {
	const isDigit = (char: string | undefined): boolean =>
		char !== undefined && char >= "0" && char <= "9";
	/** The numbers a run of digits at `start` can begin with, and where each ends. */
	const numbersAt = (s: string, start: number): [number, number][] => {
		const options: [number, number][] = [];
		let value = 0;
		for (let end = start; end < s.length && isDigit(s[end]); end++) {
			value = value * 10 + Number(s[end]);
			options.push([value, end + 1]);
		}
		return options;
	};

	// diff > 0: s1's numbers are ahead, so s2 must cover diff more characters.
	const failed = new Set<string>();
	const matches = (i: number, j: number, diff: number): boolean => {
		const key = `${i},${j},${diff}`;
		if (failed.has(key)) return false;
		let result = false;
		if (i === s1.length && j === s2.length) result = diff === 0;
		else if (isDigit(s1[i]))
			result = numbersAt(s1, i).some(([value, next]) =>
				matches(next, j, diff + value),
			);
		else if (isDigit(s2[j]))
			result = numbersAt(s2, j).some(([value, next]) =>
				matches(i, next, diff - value),
			);
		else if (diff > 0) result = j < s2.length && matches(i, j + 1, diff - 1);
		else if (diff < 0) result = i < s1.length && matches(i + 1, j, diff + 1);
		else
			result =
				i < s1.length &&
				j < s2.length &&
				s1[i] === s2[j] &&
				matches(i + 1, j + 1, 0);
		if (!result) failed.add(key);
		return result;
	};
	return matches(0, 0, 0);
};
