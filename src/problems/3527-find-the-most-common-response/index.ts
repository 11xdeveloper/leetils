/**
 * 3527. Find the Most Common Response
 *
 * After dropping repeated responses within each day, the response given on
 * the most days, the lexicographically smallest on a tie.
 *
 * Count each day's distinct responses.
 *
 * @see https://leetcode.com/problems/find-the-most-common-response/
 * @difficulty Medium
 * @timeComplexity O(total length)
 * @spaceComplexity O(total length)
 *
 * @example
 * findTheMostCommonResponse([["good", "ok", "good", "ok"], ["ok", "bad", "good", "ok", "ok"], ["good"], ["bad"]]); // "good"
 */
export const findTheMostCommonResponse = (
	responses: readonly (readonly string[])[],
): string => {
	const days = new Map<string, number>();
	for (const day of responses)
		for (const response of new Set(day))
			days.set(response, (days.get(response) ?? 0) + 1);
	let best = "";
	let bestCount = 0;
	for (const [response, count] of days)
		if (count > bestCount || (count === bestCount && response < best)) {
			best = response;
			bestCount = count;
		}
	return best;
};
