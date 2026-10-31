/**
 * 2904. Shortest and Lexicographically Smallest Beautiful String
 *
 * A substring of the binary string `s` is beautiful if it has exactly
 * `k` ones. Returns the shortest beautiful substring, choosing the
 * lexicographically smallest on ties, or "" if there is none.
 *
 * A shortest one starts and ends with a 1, so slide over windows of `k`
 * consecutive ones.
 *
 * @see https://leetcode.com/problems/shortest-and-lexicographically-smallest-beautiful-string/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n)
 *
 * @example
 * shortestAndLexicographicallySmallestBeautifulString("100011001", 3); // "11001"
 */
export const shortestAndLexicographicallySmallestBeautifulString = (
	s: string,
	k: number,
): string => {
	const ones: number[] = [];
	for (let i = 0; i < s.length; i++) if (s.charAt(i) === "1") ones.push(i);
	let best = "";
	for (let i = 0; i + k <= ones.length; i++) {
		const candidate = s.slice(ones[i], (ones[i + k - 1] ?? 0) + 1);
		if (
			best === "" ||
			candidate.length < best.length ||
			(candidate.length === best.length && candidate < best)
		)
			best = candidate;
	}
	return best;
};
