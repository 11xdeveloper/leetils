/**
 * 3853. Merge Close Characters
 *
 * Two equal characters at most `k` apart are close, and the right one
 * merges into (is deleted in favour of) the left. Merge one pair at a
 * time, always the pair with the smallest left index and then right
 * index, until none is left. Returns the result.
 *
 * Simulate, since the string is short.
 *
 * @see https://leetcode.com/problems/merge-close-characters/
 * @difficulty Medium
 * @timeComplexity O(n² · k)
 * @spaceComplexity O(n)
 *
 * @example
 * mergeCloseCharacters("yybyzybz", 2); // "ybzybz"
 */
export const mergeCloseCharacters = (s: string, k: number): string => {
	const chars = [...s];
	for (let merged = true; merged; ) {
		merged = false;
		search: for (let i = 0; i < chars.length; i++)
			for (let j = i + 1; j <= i + k && j < chars.length; j++)
				if (chars[i] === chars[j]) {
					chars.splice(j, 1);
					merged = true;
					break search;
				}
	}
	return chars.join("");
};
