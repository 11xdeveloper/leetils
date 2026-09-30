/**
 * 1456. Maximum Number of Vowels in a Substring of Given Length
 *
 * Returns the most vowels in any substring of `s` of length `k`.
 *
 * Slides a window of `k` characters, counting vowels entering and leaving.
 *
 * @see https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNumberOfVowelsInASubstringOfGivenLength("abciiidef", 3); // 3
 */
export const maximumNumberOfVowelsInASubstringOfGivenLength = (
	s: string,
	k: number,
): number => {
	const isVowel = (char: string | undefined) =>
		char !== undefined && "aeiou".includes(char);
	let [count, most] = [0, 0];
	for (let i = 0; i < s.length; i++) {
		if (isVowel(s[i])) count++;
		if (i >= k && isVowel(s[i - k])) count--;
		most = Math.max(most, count);
	}
	return most;
};
