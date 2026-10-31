/**
 * 3170. Lexicographically Minimum String After Removing Stars
 *
 * Each `*` in `s` deletes itself and one of the smallest letters before it
 * that's still there. Returns the lexicographically smallest result.
 *
 * Deleting the latest copy of the smallest letter is best, since it keeps
 * earlier copies of that small letter in front. Keep a stack of positions
 * per letter, pop from the smallest non-empty one at each star, and keep
 * whatever survives.
 *
 * @see https://leetcode.com/problems/lexicographically-minimum-string-after-removing-stars/
 * @difficulty Medium
 * @timeComplexity O(26 n)
 * @spaceComplexity O(n)
 *
 * @example
 * lexicographicallyMinimumStringAfterRemovingStars("aaba*"); // "aab"
 */
export const lexicographicallyMinimumStringAfterRemovingStars = (
	s: string,
): string => {
	const stacks: number[][] = Array.from({ length: 26 }, () => []);
	const removed = new Uint8Array(s.length);
	for (let i = 0; i < s.length; i++) {
		if (s[i] !== "*") {
			stacks[s.charCodeAt(i) - 97]?.push(i);
			continue;
		}
		removed[i] = 1;
		const smallest = stacks.find((stack) => stack.length > 0);
		const position = smallest?.pop();
		if (position !== undefined) removed[position] = 1;
	}
	return [...s].filter((_, i) => !removed[i]).join("");
};
