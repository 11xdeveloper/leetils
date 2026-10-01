const A = "a".charCodeAt(0);

/**
 * 249. Group Shifted Strings
 *
 * Groups the lowercase strings in `strings` that belong to the same shifting
 * sequence: shifting every letter of a string forwards or backwards by the
 * same amount, wrapping from z to a, turns it into any other string in its
 * group. Groups are in the order their first string appears.
 *
 * Shifting a string so it starts with `a` gives the same result for every
 * string in its group, so that serves as the key for grouping them.
 *
 * @see https://leetcode.com/problems/group-shifted-strings/
 * @difficulty Medium
 * @timeComplexity O(n * k) where k is the length of the longest string
 * @spaceComplexity O(n * k)
 *
 * @example
 * groupShiftedStrings(["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"]);
 * // [["abc", "bcd", "xyz"], ["acef"], ["az", "ba"], ["a", "z"]]
 */
export const groupShiftedStrings = (strings: readonly string[]): string[][] => {
	const groups = new Map<string, string[]>();

	for (const string of strings) {
		const shift = string.charCodeAt(0) - A;
		const key = Array.from(string, (char) =>
			String.fromCharCode(A + ((char.charCodeAt(0) - A - shift + 26) % 26)),
		).join("");

		const group = groups.get(key);
		if (group) group.push(string);
		else groups.set(key, [string]);
	}

	return [...groups.values()];
};
