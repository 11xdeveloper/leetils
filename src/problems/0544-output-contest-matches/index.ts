/**
 * 544. Output Contest Matches
 *
 * Teams ranked 1 to `n` (a power of two) play a knockout tournament where
 * each round pairs the strongest remaining with the weakest, the second
 * strongest with the second weakest, and so on. Returns the full bracket as
 * nested pairs, like `"((1,4),(2,3))"`.
 *
 * Starts from the teams as strings and, each round, pairs the first with
 * the last, the second with the second last, and so on. The strongest
 * team of each pair ends up first, so the order carries into the next
 * round.
 *
 * @see https://leetcode.com/problems/output-contest-matches/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * outputContestMatches(8); // "(((1,8),(4,5)),((2,7),(3,6)))"
 */
export const outputContestMatches = (n: number): string => {
	let matches = Array.from({ length: n }, (_, i) => String(i + 1));
	while (matches.length > 1) {
		const half = matches.length / 2;
		matches = matches
			.slice(0, half)
			.map((strong, i) => `(${strong},${matches[matches.length - 1 - i]})`);
	}
	return matches[0] ?? "";
};
