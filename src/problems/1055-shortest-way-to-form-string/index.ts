/**
 * 1055. Shortest Way to Form String
 *
 * Returns the fewest subsequences of `source` that concatenate to `target`,
 * or -1 if some letter of `target` isn't in `source`.
 *
 * Greedy: each pass over `source` matches as much of `target` as it can,
 * since taking more now never hurts later passes.
 *
 * @see https://leetcode.com/problems/shortest-way-to-form-string/
 * @difficulty Medium
 * @timeComplexity O(|source| · |target|)
 * @spaceComplexity O(1)
 *
 * @example
 * shortestWayToFormString("abc", "abcbc"); // 2
 */
export const shortestWayToFormString = (
	source: string,
	target: string,
): number => {
	let passes = 0;
	for (let matched = 0; matched < target.length; passes++) {
		const before = matched;
		for (const char of source)
			if (matched < target.length && char === target.charAt(matched)) matched++;
		if (matched === before) return -1;
	}
	return passes;
};
