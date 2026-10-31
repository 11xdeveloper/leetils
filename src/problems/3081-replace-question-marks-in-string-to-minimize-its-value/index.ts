/**
 * 3081. Replace Question Marks in String to Minimize Its Value
 *
 * A string's value adds up, for each letter, how many times it appeared
 * before. Replace every `?` in `s` with a letter to make the value as small
 * as possible, returning the lexicographically smallest such string.
 *
 * The value only depends on the letter counts, Σ c(c - 1) / 2, so give each
 * `?` the currently rarest letter (the earliest on a tie). Then sort the
 * chosen letters and fill them in order, which keeps the counts but makes
 * the string smallest.
 *
 * @see https://leetcode.com/problems/replace-question-marks-in-string-to-minimize-its-value/
 * @difficulty Medium
 * @timeComplexity O(26 n)
 * @spaceComplexity O(n)
 *
 * @example
 * replaceQuestionMarksInStringToMinimizeItsValue("a?a?"); // "abac"
 */
export const replaceQuestionMarksInStringToMinimizeItsValue = (
	s: string,
): string => {
	const counts = new Array<number>(26).fill(0);
	for (const char of s)
		if (char !== "?")
			counts[char.charCodeAt(0) - 97] =
				(counts[char.charCodeAt(0) - 97] ?? 0) + 1;
	const chosen: number[] = [];
	for (const char of s) {
		if (char !== "?") continue;
		let rarest = 0;
		for (let letter = 1; letter < 26; letter++)
			if ((counts[letter] ?? 0) < (counts[rarest] ?? 0)) rarest = letter;
		counts[rarest] = (counts[rarest] ?? 0) + 1;
		chosen.push(rarest);
	}
	chosen.sort((a, b) => a - b);
	let next = 0;
	return [...s]
		.map((char) =>
			char === "?" ? String.fromCharCode(97 + (chosen[next++] ?? 0)) : char,
		)
		.join("");
};
