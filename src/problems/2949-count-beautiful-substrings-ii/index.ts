/**
 * 2949. Count Beautiful Substrings II
 *
 * A substring is beautiful if it has as many vowels as consonants and
 * their product is divisible by `k`. Returns the number of beautiful
 * substrings, for strings too long to try them all.
 *
 * With `v` vowels and `v` consonants, `v²` divisible by `k` means `v` is
 * a multiple of the smallest `m` with `m²` divisible by `k`, so the
 * length is a multiple of `2m`. Count earlier prefixes with the same
 * vowel–consonant balance and the same position modulo `2m`.
 *
 * @see https://leetcode.com/problems/count-beautiful-substrings-ii/
 * @difficulty Hard
 * @timeComplexity O(n + √k)
 * @spaceComplexity O(n)
 *
 * @example
 * countBeautifulSubstringsII("abba", 1); // 3
 */
export const countBeautifulSubstringsII = (s: string, k: number): number => {
	let m = 1;
	while ((m * m) % k !== 0) m++;
	const period = 2 * m;
	const seen = new Map<string, number>([["0,0", 1]]);
	let balance = 0;
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		balance += "aeiou".includes(s.charAt(i)) ? 1 : -1;
		const key = `${balance},${(i + 1) % period}`;
		count += seen.get(key) ?? 0;
		seen.set(key, (seen.get(key) ?? 0) + 1);
	}
	return count;
};
