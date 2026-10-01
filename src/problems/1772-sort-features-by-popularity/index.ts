/**
 * 1772. Sort Features by Popularity
 *
 * A feature's popularity is how many `responses` mention it at least once.
 * Returns `features` sorted by decreasing popularity, keeping the original
 * order on ties.
 *
 * Count each response's distinct words, then a stable sort.
 *
 * @see https://leetcode.com/problems/sort-features-by-popularity/
 * @difficulty Medium
 * @timeComplexity O(R + f log f) for total response length R and f features
 * @spaceComplexity O(R + f)
 *
 * @example
 * sortFeaturesByPopularity(["cooler", "lock", "touch"], ["i like cooler cooler", "lock touch cool", "locker like touch"]); // ["touch", "cooler", "lock"]
 */
export const sortFeaturesByPopularity = (
	features: readonly string[],
	responses: readonly string[],
): string[] => {
	const popularity = new Map<string, number>();
	for (const response of responses) {
		for (const word of new Set(response.split(" ")))
			popularity.set(word, (popularity.get(word) ?? 0) + 1);
	}
	return features.toSorted(
		(a, b) => (popularity.get(b) ?? 0) - (popularity.get(a) ?? 0),
	);
};
