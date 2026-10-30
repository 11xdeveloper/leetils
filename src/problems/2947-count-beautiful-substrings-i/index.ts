/**
 * 2947. Count Beautiful Substrings I
 *
 * A substring is beautiful if it has as many vowels as consonants and
 * their product is divisible by `k`. Returns the number of beautiful
 * substrings.
 *
 * Extend each start rightwards, counting vowels.
 *
 * @see https://leetcode.com/problems/count-beautiful-substrings-i/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(1)
 *
 * @example
 * countBeautifulSubstringsI("baeyh", 2); // 2
 */
export const countBeautifulSubstringsI = (s: string, k: number): number => {
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		let vowels = 0;
		for (let j = i; j < s.length; j++) {
			if ("aeiou".includes(s.charAt(j))) vowels++;
			const consonants = j - i + 1 - vowels;
			if (vowels === consonants && (vowels * consonants) % k === 0) count++;
		}
	}
	return count;
};
