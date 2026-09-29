/**
 * 438. Find All Anagrams in a String
 *
 * Returns the start index of every substring of `s` that is an anagram of
 * `p`, in ascending order.
 *
 * Slides a window of `p`'s length along `s`, keeping the difference between
 * the window's letter counts and `p`'s, and how many letters currently
 * differ. The window is an anagram exactly when none differ.
 *
 * @see https://leetcode.com/problems/find-all-anagrams-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), at most 26 letters
 *
 * @example
 * findAllAnagramsInAString("cbaebabacd", "abc"); // [0, 6]
 */
export const findAllAnagramsInAString = (s: string, p: string): number[] => {
	const difference = new Map<string, number>();
	let differing = 0;
	const adjust = (char: string, delta: number): void => {
		const before = difference.get(char) ?? 0;
		const after = before + delta;
		difference.set(char, after);
		if (before === 0) differing++;
		else if (after === 0) differing--;
	};

	for (const char of p) adjust(char, -1);
	const starts: number[] = [];
	for (let i = 0; i < s.length; i++) {
		adjust(s.charAt(i), 1);
		if (i >= p.length) adjust(s.charAt(i - p.length), -1);
		if (i >= p.length - 1 && differing === 0) starts.push(i - p.length + 1);
	}

	return starts;
};
