/**
 * 844. Backspace String Compare
 *
 * Returns whether `s` and `t` are equal after typing them into empty text
 * editors, where `#` is a backspace.
 *
 * Walks both strings from the end, skipping characters erased by later
 * backspaces, and compares the surviving characters one by one. Uses O(1)
 * extra space, as the follow-up asks.
 *
 * @see https://leetcode.com/problems/backspace-string-compare/
 * @difficulty Easy
 * @timeComplexity O(n + m)
 * @spaceComplexity O(1)
 *
 * @example
 * backspaceStringCompare("ab#c", "ad#c"); // true
 */
export const backspaceStringCompare = (s: string, t: string): boolean => {
	/** The index of the next surviving character at or before i, or -1. */
	const nextKept = (text: string, i: number): number => {
		let skip = 0;
		for (; i >= 0; i--) {
			if (text.charAt(i) === "#") skip++;
			else if (skip > 0) skip--;
			else break;
		}
		return i;
	};

	let i = s.length - 1;
	let j = t.length - 1;
	for (;;) {
		i = nextKept(s, i);
		j = nextKept(t, j);
		if (i < 0 || j < 0) return i < 0 && j < 0;
		if (s.charAt(i) !== t.charAt(j)) return false;
		i--;
		j--;
	}
};
