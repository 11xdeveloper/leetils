/**
 * 1915. Number of Wonderful Substrings
 *
 * A wonderful string has at most one letter appearing an odd number of
 * times. Counts the wonderful substrings of `word` (letters `a`–`j`).
 *
 * The parity of each letter in a prefix is a 10-bit mask. A substring is
 * wonderful when its two end masks are equal or differ in one bit, so
 * count earlier prefixes with each mask.
 *
 * @see https://leetcode.com/problems/number-of-wonderful-substrings/
 * @difficulty Medium
 * @timeComplexity O(10n)
 * @spaceComplexity O(2^10)
 *
 * @example
 * numberOfWonderfulSubstrings("aabb"); // 9
 */
export const numberOfWonderfulSubstrings = (word: string): number => {
	const seen = new Array<number>(1024).fill(0);
	seen[0] = 1;
	let [mask, count] = [0, 0];
	for (let i = 0; i < word.length; i++) {
		mask ^= 1 << (word.charCodeAt(i) - 97);
		count += seen[mask] ?? 0;
		for (let bit = 0; bit < 10; bit++) count += seen[mask ^ (1 << bit)] ?? 0;
		seen[mask] = (seen[mask] ?? 0) + 1;
	}
	return count;
};
