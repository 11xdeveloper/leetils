/**
 * 3541. Find Most Frequent Vowel and Consonant
 *
 * The highest vowel frequency plus the highest consonant frequency in `s`.
 *
 * Count the letters.
 *
 * @see https://leetcode.com/problems/find-most-frequent-vowel-and-consonant/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findMostFrequentVowelAndConsonant("successes"); // 6
 */
export const findMostFrequentVowelAndConsonant = (s: string): number => {
	const counts = new Map<string, number>();
	for (const c of s) counts.set(c, (counts.get(c) ?? 0) + 1);
	let vowel = 0;
	let consonant = 0;
	for (const [c, count] of counts)
		if ("aeiou".includes(c)) vowel = Math.max(vowel, count);
		else consonant = Math.max(consonant, count);
	return vowel + consonant;
};
