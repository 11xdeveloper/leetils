const WORDS = [
	"zero",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

/**
 * 3581. Count Odd Letters from Number
 *
 * Spell each digit of `n` in English and join the words. Counts the
 * letters that appear an odd number of times.
 *
 * Toggle a bit per letter.
 *
 * @see https://leetcode.com/problems/count-odd-letters-from-number/
 * @difficulty Easy
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * countOddLettersFromNumber(41); // 5
 */
export const countOddLettersFromNumber = (n: number): number => {
	let odd = 0;
	for (const digit of String(n))
		for (const letter of WORDS[Number(digit)] ?? "")
			odd ^= 1 << (letter.charCodeAt(0) - 97);
	let count = 0;
	for (; odd; odd &= odd - 1) count++;
	return count;
};
