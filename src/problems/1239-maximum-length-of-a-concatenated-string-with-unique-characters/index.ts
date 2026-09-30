/**
 * 1239. Maximum Length of a Concatenated String with Unique Characters
 *
 * Returns the length of the longest concatenation of some of the strings in
 * `arr` (in order) with no repeated letter.
 *
 * Turns each string without repeats into a bitmask of its letters, then
 * builds up every achievable set of letters: each string can join any set
 * it doesn't overlap.
 *
 * @see https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/
 * @difficulty Medium
 * @timeComplexity O(2^n) for n strings
 * @spaceComplexity O(2^n)
 *
 * @example
 * maximumLengthOfAConcatenatedStringWithUniqueCharacters(["cha", "r", "act", "ers"]); // 6
 */
export const maximumLengthOfAConcatenatedStringWithUniqueCharacters = (
	arr: readonly string[],
): number => {
	const sets = [0];
	let longest = 0;
	for (const word of arr) {
		let mask = 0;
		for (let i = 0; i < word.length && mask !== -1; i++) {
			const bit = 1 << (word.charCodeAt(i) - 97);
			mask = mask & bit ? -1 : mask | bit;
		}
		if (mask === -1) continue;
		for (let i = sets.length - 1; i >= 0; i--) {
			const set = sets[i] ?? 0;
			if (set & mask) continue;
			const combined = set | mask;
			sets.push(combined);
			let size = 0;
			for (let rest = combined; rest !== 0; rest &= rest - 1) size++;
			longest = Math.max(longest, size);
		}
	}
	return longest;
};
