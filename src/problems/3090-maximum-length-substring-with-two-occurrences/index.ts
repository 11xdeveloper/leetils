/**
 * 3090. Maximum Length Substring With Two Occurrences
 *
 * The longest substring of `s` with no letter more than twice.
 *
 * Slide a window, shrinking it from the left whenever the newest letter
 * appears a third time.
 *
 * @see https://leetcode.com/problems/maximum-length-substring-with-two-occurrences/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumLengthSubstringWithTwoOccurrences("bcbbbcba"); // 4
 */
export const maximumLengthSubstringWithTwoOccurrences = (s: string): number => {
	const counts = new Array<number>(26).fill(0);
	let best = 0;
	for (let left = 0, right = 0; right < s.length; right++) {
		const letter = s.charCodeAt(right) - 97;
		counts[letter] = (counts[letter] ?? 0) + 1;
		while ((counts[letter] ?? 0) > 2) {
			const dropped = s.charCodeAt(left++) - 97;
			counts[dropped] = (counts[dropped] ?? 0) - 1;
		}
		best = Math.max(best, right - left + 1);
	}
	return best;
};
