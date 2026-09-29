/**
 * 275. H-Index II
 *
 * Returns a researcher's h-index, as in H-Index, where `citations` is
 * already sorted in ascending order, in logarithmic time.
 *
 * With the citations sorted, the papers from index `i` onwards number
 * `n - i`, and all have at least `citations[i]` citations. Binary searching
 * for the first `i` where `citations[i] >= n - i` gives the h-index as
 * `n - i`.
 *
 * @see https://leetcode.com/problems/h-index-ii/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * hIndexII([0, 1, 3, 5, 6]); // 3
 */
export const hIndexII = (citations: readonly number[]): number => {
	const n = citations.length;
	let low = 0;
	let high = n;

	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if ((citations[mid] ?? 0) >= n - mid) high = mid;
		else low = mid + 1;
	}

	return n - low;
};
