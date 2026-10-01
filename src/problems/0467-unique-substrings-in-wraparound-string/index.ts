/**
 * 467. Unique Substrings in Wraparound String
 *
 * `base` is the alphabet repeated forever: `"...zabcdefghijklmnopqrstuvwxyzabc..."`.
 * Returns how many distinct non-empty substrings of `s` are also substrings
 * of `base`.
 *
 * A substring of `base` is fixed by its last letter and length, and if it
 * appears in `s` so do all shorter ones ending in the same letter. So for
 * each letter it's enough to know the longest run in `s` ending with it
 * where each letter follows the one before in the alphabet (with `a` after
 * `z`), and the answer is the sum of those lengths.
 *
 * @see https://leetcode.com/problems/unique-substrings-in-wraparound-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 counts
 *
 * @example
 * uniqueSubstringsInWraparoundString("zab"); // 6: "z", "a", "b", "za", "ab" and "zab"
 */
export const uniqueSubstringsInWraparoundString = (s: string): number => {
	const longest = new Array<number>(26).fill(0);
	let run = 0;

	for (let i = 0; i < s.length; i++) {
		const letter = s.charCodeAt(i) - 97;
		const follows = i > 0 && (s.charCodeAt(i - 1) - 97 + 1) % 26 === letter;
		run = follows ? run + 1 : 1;
		longest[letter] = Math.max(longest[letter] ?? 0, run);
	}

	return longest.reduce((total, length) => total + length, 0);
};
