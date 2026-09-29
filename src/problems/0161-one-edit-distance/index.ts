/**
 * 161. One Edit Distance
 *
 * Returns whether `s` and `t` are exactly one edit apart: one character
 * inserted, deleted or replaced turns `s` into `t`. Equal strings are zero
 * edits apart, so they don't count.
 *
 * Finds the first position where the strings differ. If they have the same
 * length, the rest after that position must match (a replacement);
 * otherwise the longer string without that character must match the shorter
 * one (an insertion or deletion).
 *
 * @see https://leetcode.com/problems/one-edit-distance/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the slices compared
 *
 * @example
 * oneEditDistance("ab", "acb"); // true
 * oneEditDistance("", ""); // false
 */
export const oneEditDistance = (s: string, t: string): boolean => {
	const [shorter, longer] = s.length <= t.length ? [s, t] : [t, s];
	if (longer.length - shorter.length > 1) return false;

	for (let i = 0; i < shorter.length; i++) {
		if (shorter[i] === longer[i]) continue;
		return shorter.length === longer.length
			? shorter.slice(i + 1) === longer.slice(i + 1)
			: shorter.slice(i) === longer.slice(i + 1);
	}

	// Every character matched, so they're one apart only if longer has one more.
	return longer.length === shorter.length + 1;
};
