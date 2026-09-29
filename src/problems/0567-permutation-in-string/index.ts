/**
 * 567. Permutation in String
 *
 * Returns whether `s2` contains a permutation of `s1` as a substring.
 *
 * Slides a window of `s1`'s length along `s2`, tracking how the window's
 * letter counts differ from `s1`'s, and how many letters differ. A
 * permutation is found when none do.
 *
 * @see https://leetcode.com/problems/permutation-in-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1), 26 counts
 *
 * @example
 * permutationInString("ab", "eidbaooo"); // true: "ba"
 */
export const permutationInString = (s1: string, s2: string): boolean => {
	const difference = new Array<number>(26).fill(0);
	let differing = 0;
	const adjust = (code: number, delta: number): void => {
		const letter = code - 97;
		const before = difference[letter] ?? 0;
		difference[letter] = before + delta;
		if (before === 0) differing++;
		else if (before + delta === 0) differing--;
	};

	for (let i = 0; i < s1.length; i++) adjust(s1.charCodeAt(i), -1);
	for (let i = 0; i < s2.length; i++) {
		adjust(s2.charCodeAt(i), 1);
		if (i >= s1.length) adjust(s2.charCodeAt(i - s1.length), -1);
		if (i >= s1.length - 1 && differing === 0) return true;
	}

	return false;
};
