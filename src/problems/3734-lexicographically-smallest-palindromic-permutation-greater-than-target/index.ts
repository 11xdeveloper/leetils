/**
 * 3734. Lexicographically Smallest Palindromic Permutation Greater Than Target
 *
 * The smallest palindrome rearranging `s` that is strictly greater than
 * `target` (of the same length), or "".
 *
 * A palindrome is fixed by its first half. If the half can copy target's
 * first half, that palindrome is the best when it beats target. Otherwise
 * copy the longest prefix of target's half that still leaves a larger
 * letter for the next spot, place it, and sort the rest of the half.
 *
 * @see https://leetcode.com/problems/lexicographically-smallest-palindromic-permutation-greater-than-target/
 * @difficulty Hard
 * @timeComplexity O(26 · n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallySmallestPalindromicPermutationGreaterThanTarget("baba", "abba"); // "baab"
 */
export const lexicographicallySmallestPalindromicPermutationGreaterThanTarget =
	(s: string, target: string): string => {
		const n = s.length;
		const counts = new Array<number>(26).fill(0);
		for (const c of s)
			counts[c.charCodeAt(0) - 97] = (counts[c.charCodeAt(0) - 97] ?? 0) + 1;
		const odd = counts.flatMap((count, letter) =>
			count % 2 === 1 ? [letter] : [],
		);
		if (odd.length > n % 2) return "";
		const middle =
			odd.length > 0 ? String.fromCharCode(97 + (odd[0] ?? 0)) : "";
		const half = counts.map((count) => Math.floor(count / 2));
		const h = Math.floor(n / 2);
		const build = (left: string): string =>
			left + middle + [...left].reverse().join("");
		let prefix = 0;
		while (prefix < h) {
			const c = target.charCodeAt(prefix) - 97;
			if (!half[c]) break;
			half[c] = (half[c] ?? 0) - 1;
			prefix++;
		}
		if (prefix === h) {
			const whole = build(target.slice(0, h));
			if (whole > target) return whole;
		}
		for (let i = Math.min(prefix, h - 1); i >= 0; i--) {
			if (i < prefix) {
				const c = target.charCodeAt(i) - 97;
				half[c] = (half[c] ?? 0) + 1;
			}
			let bigger = target.charCodeAt(i) - 97 + 1;
			while (bigger < 26 && !half[bigger]) bigger++;
			if (bigger === 26) continue;
			half[bigger] = (half[bigger] ?? 0) - 1;
			let rest = "";
			half.forEach((count, letter) => {
				rest += String.fromCharCode(97 + letter).repeat(count);
			});
			return build(
				target.slice(0, i) + String.fromCharCode(97 + bigger) + rest,
			);
		}
		return "";
	};
