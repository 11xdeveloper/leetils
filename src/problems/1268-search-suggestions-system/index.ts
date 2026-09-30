/**
 * 1268. Search Suggestions System
 *
 * After each character of `searchWord` is typed, suggests up to three
 * products (smallest first) that start with what's been typed so far.
 * Returns the suggestions for each prefix.
 *
 * Sorts the products; the ones sharing a prefix then form a contiguous run,
 * which starts at the first product not below the prefix (found by binary
 * search).
 *
 * @see https://leetcode.com/problems/search-suggestions-system/
 * @difficulty Medium
 * @timeComplexity O(n log n · L + w · (log n · w)) for n products of length L and a w-letter search
 * @spaceComplexity O(n)
 *
 * @example
 * searchSuggestionsSystem(["havana"], "hav"); // [["havana"], ["havana"], ["havana"]]
 */
export const searchSuggestionsSystem = (
	products: readonly string[],
	searchWord: string,
): string[][] => {
	const sorted = products.toSorted();
	const result: string[][] = [];
	for (let length = 1; length <= searchWord.length; length++) {
		const prefix = searchWord.slice(0, length);
		let [low, high] = [0, sorted.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid] ?? "") < prefix) low = mid + 1;
			else high = mid;
		}
		result.push(
			sorted
				.slice(low, low + 3)
				.filter((product) => product.startsWith(prefix)),
		);
	}
	return result;
};
