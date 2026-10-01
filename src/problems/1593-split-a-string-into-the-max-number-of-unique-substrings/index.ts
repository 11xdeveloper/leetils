/**
 * 1593. Split a String Into the Max Number of Unique Substrings
 *
 * Returns the most pieces `s` can be split into with every piece distinct.
 *
 * Backtracking over the length of each next piece, keeping a set of pieces
 * used, and pruning branches that can't beat the best so far even if every
 * remaining character became its own piece.
 *
 * @see https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings/
 * @difficulty Medium
 * @timeComplexity O(2^n · n) in the worst case
 * @spaceComplexity O(n)
 *
 * @example
 * splitAStringIntoTheMaxNumberOfUniqueSubstrings("ababccc"); // 5
 */
export const splitAStringIntoTheMaxNumberOfUniqueSubstrings = (
	s: string,
): number => {
	const used = new Set<string>();
	let best = 0;
	const split = (start: number): void => {
		if (used.size + (s.length - start) <= best) return;
		if (start === s.length) {
			best = used.size;
			return;
		}
		for (let end = start + 1; end <= s.length; end++) {
			const piece = s.slice(start, end);
			if (used.has(piece)) continue;
			used.add(piece);
			split(end);
			used.delete(piece);
		}
	};
	split(0);
	return best;
};
