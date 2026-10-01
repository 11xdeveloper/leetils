/**
 * 291. Word Pattern II
 *
 * Returns whether `s` can be split so that it follows `pattern`: each letter
 * of the pattern stands for one non-empty string, consistently, no two
 * letters stand for the same string, and the strings joined in pattern
 * order spell `s`.
 *
 * Backtracking: a letter already assigned must match its string at the
 * current position; a new letter tries every unused string that leaves at
 * least one character for each remaining letter.
 *
 * @see https://leetcode.com/problems/word-pattern-ii/
 * @difficulty Medium
 * @timeComplexity O(n^m) where n is the length of s and m of the pattern
 * @spaceComplexity O(m)
 *
 * @example
 * wordPatternII("abab", "redblueredblue"); // true: a is "red", b is "blue"
 */
export const wordPatternII = (pattern: string, s: string): boolean => {
	const stringFor = new Map<string, string>();
	const used = new Set<string>();

	const match = (p: number, i: number): boolean => {
		if (p === pattern.length) return i === s.length;
		const letter = pattern.charAt(p);
		const assigned = stringFor.get(letter);
		if (assigned !== undefined) {
			return s.startsWith(assigned, i) && match(p + 1, i + assigned.length);
		}

		const lettersLeft = pattern.length - p - 1;
		for (let end = i + 1; end <= s.length - lettersLeft; end++) {
			const candidate = s.slice(i, end);
			if (used.has(candidate)) continue;
			stringFor.set(letter, candidate);
			used.add(candidate);
			if (match(p + 1, end)) return true;
			stringFor.delete(letter);
			used.delete(candidate);
		}
		return false;
	};

	return match(0, 0);
};
