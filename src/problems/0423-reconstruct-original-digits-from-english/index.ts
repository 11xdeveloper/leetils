const DIGITS: readonly (readonly [
	digit: number,
	word: string,
	unique: string,
])[] = [
	// Each word is identified by a letter no word later in the list still has.
	[0, "zero", "z"],
	[2, "two", "w"],
	[4, "four", "u"],
	[6, "six", "x"],
	[8, "eight", "g"],
	[1, "one", "o"],
	[3, "three", "h"],
	[5, "five", "f"],
	[7, "seven", "s"],
	[9, "nine", "i"],
];

/**
 * 423. Reconstruct Original Digits from English
 *
 * `s` is the English words for some digits ("zero" to "nine") with their
 * letters shuffled together. Returns the digits in ascending order.
 *
 * Some letters appear in only one digit's word, like `z` in zero, so its
 * count is how many zeros there are. Removing those words exposes letters
 * unique among the rest (`o` is only in one once zero, two and four are
 * gone), so the digits are counted in that order.
 *
 * @see https://leetcode.com/problems/reconstruct-original-digits-from-english/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reconstructOriginalDigitsFromEnglish("owoztneoer"); // "012"
 */
export const reconstructOriginalDigitsFromEnglish = (s: string): string => {
	const letters = new Map<string, number>();
	for (const char of s) letters.set(char, (letters.get(char) ?? 0) + 1);

	const counts = new Array<number>(10).fill(0);
	for (const [digit, word, unique] of DIGITS) {
		const count = letters.get(unique) ?? 0;
		counts[digit] = count;
		for (const char of word)
			letters.set(char, (letters.get(char) ?? 0) - count);
	}

	return counts.map((count, digit) => String(digit).repeat(count)).join("");
};
