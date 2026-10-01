/**
 * 1436. Destination City
 *
 * `paths` forms a single line of one-way trips. Returns the city at the end,
 * the only one with no outgoing trip.
 *
 * Collects the cities that trips leave from and finds the destination that
 * isn't one of them.
 *
 * @see https://leetcode.com/problems/destination-city/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * destinationCity([["B", "C"], ["D", "B"], ["C", "A"]]); // "A"
 */
export const destinationCity = (
	paths: readonly (readonly string[])[],
): string => {
	const starts = new Set(paths.map(([from = ""]) => from));
	return paths.find(([, to = ""]) => !starts.has(to))?.[1] ?? "";
};
