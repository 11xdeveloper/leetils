/**
 * 3261. Count Substrings That Satisfy K-Constraint II
 *
 * For each query `[l, r]`, count the substrings of `s[l..r]` with at most
 * `k` zeros or at most `k` ones.
 *
 * Sliding a window gives, for each end j, the earliest valid start
 * `start[j]`, which never decreases. For a query, ends whose earliest start
 * is before l count every start from l, an arithmetic series, and the rest
 * count `j - start[j] + 1`, summed with prefix sums. The first end of the
 * second kind is precomputed for every l.
 *
 * @see https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-ii/
 * @difficulty Hard
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubstringsThatSatisfyKConstraintII("0001111", 2, [[0, 6]]); // [26]
 */
export const countSubstringsThatSatisfyKConstraintII = (
	s: string,
	k: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const n = s.length;
	const start = new Int32Array(n);
	let zeros = 0;
	let ones = 0;
	for (let left = 0, right = 0; right < n; right++) {
		if (s[right] === "0") zeros++;
		else ones++;
		while (zeros > k && ones > k)
			if (s[left++] === "0") zeros--;
			else ones--;
		start[right] = left;
	}
	const prefix = new Float64Array(n + 1);
	for (let j = 0; j < n; j++)
		prefix[j + 1] = (prefix[j] ?? 0) + j - (start[j] ?? 0) + 1;
	// firstEnd[l]: the first end j whose earliest start is at least l.
	const firstEnd = new Int32Array(n + 1);
	for (let l = 0, j = 0; l <= n; l++) {
		while (j < n && (start[j] ?? 0) < l) j++;
		firstEnd[l] = j;
	}
	return queries.map(([l = 0, r = 0]) => {
		const split = Math.min(Math.max(firstEnd[l] ?? 0, l), r + 1);
		const early = split - l;
		return (
			(early * (early + 1)) / 2 + (prefix[r + 1] ?? 0) - (prefix[split] ?? 0)
		);
	});
};
