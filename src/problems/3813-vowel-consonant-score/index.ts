/**
 * 3813. Vowel-Consonant Score
 *
 * With v vowels and c consonants among the letters of `s`, returns
 * ⌊v / c⌋, or 0 if there are no consonants.
 *
 * @see https://leetcode.com/problems/vowel-consonant-score/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * vowelConsonantScore("cooear"); // 2
 */
export const vowelConsonantScore = (s: string): number => {
	let [vowels, consonants] = [0, 0];
	for (const c of s) {
		if ("aeiou".includes(c)) vowels++;
		else if (c >= "a" && c <= "z") consonants++;
	}
	return consonants > 0 ? Math.floor(vowels / consonants) : 0;
};
