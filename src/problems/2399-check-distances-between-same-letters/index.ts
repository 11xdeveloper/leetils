/**
 * 2399. Check Distances Between Same Letters
 *
 * Each letter in `s` appears exactly twice. Returns whether the number of
 * letters between each pair matches `distance` for that letter.
 *
 * @see https://leetcode.com/problems/check-distances-between-same-letters/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * checkDistancesBetweenSameLetters("abaccb", [1, 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // true
 */
export const checkDistancesBetweenSameLetters = (
	s: string,
	distance: readonly number[],
): boolean => {
	const first = new Map<string, number>();
	for (const [i, char] of [...s].entries()) {
		const seen = first.get(char);
		if (seen === undefined) first.set(char, i);
		else if (i - seen - 1 !== distance[char.charCodeAt(0) - 97]) return false;
	}
	return true;
};
