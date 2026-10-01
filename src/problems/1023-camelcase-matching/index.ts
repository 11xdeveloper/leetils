/**
 * 1023. Camelcase Matching
 *
 * A query matches `pattern` if lowercase letters can be inserted into the
 * pattern to produce it. Returns, for each query, whether it matches.
 *
 * Walks each query alongside the pattern: pattern letters are matched in
 * order, and any unmatched query letter must be lowercase.
 *
 * @see https://leetcode.com/problems/camelcase-matching/
 * @difficulty Medium
 * @timeComplexity O(total length of the queries)
 * @spaceComplexity O(1) excluding the returned array
 *
 * @example
 * camelcaseMatching(["FooBar", "FooBarTest", "FootBall"], "FB"); // [true, false, true]
 */
export const camelcaseMatching = (
	queries: readonly string[],
	pattern: string,
): boolean[] =>
	queries.map((query) => {
		let matched = 0;
		for (const char of query) {
			if (matched < pattern.length && char === pattern.charAt(matched))
				matched++;
			else if (char !== char.toLowerCase()) return false;
		}
		return matched === pattern.length;
	});
