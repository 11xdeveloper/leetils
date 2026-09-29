const ONES = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen",
];
const TENS = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety",
];
const SCALES = ["", "Thousand", "Million", "Billion"];

/** Writes a number below 1000 as words, or "" for 0. */
const belowThousand = (n: number): string[] => {
	const words: string[] = [];
	if (n >= 100) words.push(ONES[Math.floor(n / 100)] ?? "", "Hundred");
	const rest = n % 100;
	if (rest >= 20)
		words.push(TENS[Math.floor(rest / 10)] ?? "", ONES[rest % 10] ?? "");
	else words.push(ONES[rest] ?? "");
	return words.filter((word) => word !== "");
};

/**
 * 273. Integer to English Words
 *
 * Writes a non-negative integer (at most 2^31 - 1) in English words, like
 * `"One Hundred Twenty Three"`.
 *
 * Splits the number into groups of three digits, writes each group below a
 * thousand, and follows each non-zero group with its scale: Thousand,
 * Million or Billion.
 *
 * @see https://leetcode.com/problems/integer-to-english-words/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * integerToEnglishWords(1234567); // "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
 */
export const integerToEnglishWords = (num: number): string => {
	if (num === 0) return "Zero";

	const words: string[] = [];
	for (let scale = SCALES.length - 1; scale >= 0; scale--) {
		const group = Math.floor(num / 1000 ** scale) % 1000;
		if (group === 0) continue;
		words.push(...belowThousand(group));
		if (scale > 0) words.push(SCALES[scale] ?? "");
	}

	return words.join(" ");
};
