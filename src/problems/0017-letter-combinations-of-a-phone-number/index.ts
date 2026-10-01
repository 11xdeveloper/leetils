const LETTERS: Readonly<Record<string, string>> = {
	2: "abc",
	3: "def",
	4: "ghi",
	5: "jkl",
	6: "mno",
	7: "pqrs",
	8: "tuv",
	9: "wxyz",
};

/**
 * 17. Letter Combinations of a Phone Number
 *
 * Returns every string of letters that the digits 2–9 in `digits` could spell
 * on a phone keypad. Returns an empty array for an empty string.
 *
 * Builds the combinations one digit at a time, extending every combination so
 * far with each of the next digit's letters.
 *
 * @see https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * @difficulty Medium
 * @timeComplexity O(4^n * n)
 * @spaceComplexity O(4^n * n) for the returned combinations
 *
 * @example
 * letterCombinationsOfAPhoneNumber("23"); // ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
 */
export const letterCombinationsOfAPhoneNumber = (digits: string): string[] => {
	if (digits === "") return [];

	let combinations = [""];
	for (const digit of digits) {
		const letters = LETTERS[digit] ?? "";
		combinations = combinations.flatMap((prefix) =>
			Array.from(letters, (letter) => prefix + letter),
		);
	}

	return combinations;
};
