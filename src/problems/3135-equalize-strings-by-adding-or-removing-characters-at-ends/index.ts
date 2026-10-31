/**
 * 3135. Equalize Strings by Adding or Removing Characters at Ends
 *
 * The fewest single-letter additions or removals at either end of `initial`
 * needed to turn it into `target`.
 *
 * Keep the longest common substring and rebuild around it: remove the rest
 * of `initial` and add the rest of `target`. Find that substring with
 * dynamic programming over the lengths of common suffixes.
 *
 * @see https://leetcode.com/problems/equalize-strings-by-adding-or-removing-characters-at-ends/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(m)
 *
 * @example
 * equalizeStringsByAddingOrRemovingCharactersAtEnds("abcde", "cdef"); // 3
 */
export const equalizeStringsByAddingOrRemovingCharactersAtEnds = (
	initial: string,
	target: string,
): number => {
	let previous = new Int32Array(target.length + 1);
	let longest = 0;
	for (let i = 1; i <= initial.length; i++) {
		const current = new Int32Array(target.length + 1);
		for (let j = 1; j <= target.length; j++)
			if (initial[i - 1] === target[j - 1]) {
				current[j] = (previous[j - 1] ?? 0) + 1;
				longest = Math.max(longest, current[j] ?? 0);
			}
		previous = current;
	}
	return initial.length + target.length - 2 * longest;
};
