/**
 * 3720. Lexicographically Smallest Permutation Greater Than Target
 *
 * The smallest rearrangement of `s` that is strictly greater than
 * `target` (of the same length), or "".
 *
 * The answer copies a prefix of target, then puts a larger letter, then
 * the rest in sorted order. Take the longest prefix that works: one whose
 * letters are available and leaves a letter above target's next one.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-permutation-greater-than-target/
 * @difficulty Medium
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestPermutationGreaterThanTarget("abc", "bba"); // "bca"
 */
export const lexicographicallySmallestPermutationGreaterThanTarget = (
	s: string,
	target: string,
): string => {
	const n = s.length;
	const counts = new Array<number>(26).fill(0);
	for (const c of s)
		counts[c.charCodeAt(0) - 97] = (counts[c.charCodeAt(0) - 97] ?? 0) + 1;
	// Use up the longest prefix of target possible.
	let prefix = 0;
	while (prefix < n) {
		const c = target.charCodeAt(prefix) - 97;
		if (!counts[c]) break;
		counts[c] = (counts[c] ?? 0) - 1;
		prefix++;
	}
	for (let i = Math.min(prefix, n - 1); i >= 0; i--) {
		if (i < prefix) {
			const c = target.charCodeAt(i) - 97;
			counts[c] = (counts[c] ?? 0) + 1;
		}
		const at = target.charCodeAt(i) - 97;
		let bigger = at + 1;
		while (bigger < 26 && !counts[bigger]) bigger++;
		if (bigger === 26) continue;
		counts[bigger] = (counts[bigger] ?? 0) - 1;
		let rest = "";
		counts.forEach((count, letter) => {
			rest += String.fromCharCode(97 + letter).repeat(count);
		});
		return target.slice(0, i) + String.fromCharCode(97 + bigger) + rest;
	}
	return "";
};
