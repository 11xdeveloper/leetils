/**
 * 274. H-Index
 *
 * Returns a researcher's h-index: the largest `h` such that they have at
 * least `h` papers with at least `h` citations each, where `citations[i]` is
 * the citations of paper `i`.
 *
 * The h-index is at most the number of papers `n`, so it counts papers by
 * citations, capping counts at `n`. Then it walks down from `n`, adding up
 * papers with at least that many citations, until the total reaches the
 * count. No sort is needed.
 *
 * @see https://leetcode.com/problems/h-index/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * hIndex([3, 0, 6, 1, 5]); // 3
 */
export const hIndex = (citations: readonly number[]): number => {
	const n = citations.length;
	const papers = new Array<number>(n + 1).fill(0);
	for (const count of citations) {
		const capped = Math.min(count, n);
		papers[capped] = (papers[capped] ?? 0) + 1;
	}

	let atLeast = 0;
	for (let h = n; h > 0; h--) {
		atLeast += papers[h] ?? 0;
		if (atLeast >= h) return h;
	}

	return 0;
};
