/**
 * 3518. Smallest Palindromic Rearrangement II
 *
 * The k-th lexicographically smallest distinct palindromic rearrangement of
 * the palindrome `s`, or `""` if there are fewer than k.
 *
 * A palindrome is fixed by its first half, so find the k-th arrangement of
 * the half's letters: try letters in order at each position, skipping
 * whole blocks of arrangements counted as multinomials (capped above k).
 *
 * @see https://leetcode.com/problems/smallest-palindromic-rearrangement-ii/
 * @difficulty Hard
 * @timeComplexity O(n · 26² · log k)
 * @spaceComplexity O(n)
 *
 * @example
 * smallestPalindromicRearrangementII("abba", 2); // "baab"
 */
export const smallestPalindromicRearrangementII = (
	s: string,
	k: number,
): string => {
	const halfLength = Math.floor(s.length / 2);
	const counts = new Array<number>(26).fill(0);
	for (let i = 0; i < halfLength; i++)
		counts[s.charCodeAt(i) - 97] = (counts[s.charCodeAt(i) - 97] ?? 0) + 1;
	const cap = k + 1;
	const choose = (n: number, r: number): number => {
		const small = Math.min(r, n - r);
		let result = 1;
		for (let i = 1; i <= small; i++) {
			result = (result * (n - small + i)) / i;
			if (result >= cap) return cap;
		}
		return result;
	};
	const arrangements = (): number => {
		let total = 1;
		let placed = 0;
		for (const count of counts) {
			placed += count;
			total = Math.min(cap, total * choose(placed, count));
			if (total >= cap) return cap;
		}
		return total;
	};
	if (arrangements() < k) return "";
	let left = k;
	let half = "";
	for (let position = 0; position < halfLength; position++)
		for (let letter = 0; letter < 26; letter++) {
			if ((counts[letter] ?? 0) === 0) continue;
			counts[letter] = (counts[letter] ?? 0) - 1;
			const ways = arrangements();
			if (ways >= left) {
				half += String.fromCharCode(97 + letter);
				break;
			}
			left -= ways;
			counts[letter] = (counts[letter] ?? 0) + 1;
		}
	const middle = s.length % 2 === 1 ? s.charAt(halfLength) : "";
	return half + middle + [...half].reverse().join("");
};
