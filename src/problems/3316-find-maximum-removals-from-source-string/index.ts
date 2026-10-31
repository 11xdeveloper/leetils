/**
 * 3316. Find Maximum Removals From Source String
 *
 * Remove as many characters of `source` at indices from `targetIndices` as
 * possible while `pattern` stays a subsequence. Returns how many.
 *
 * Dynamic programming over `source` and progress through `pattern`: each
 * character either matches the next pattern letter or is skipped, and
 * skipping a target index counts as a removal.
 *
 * @see https://leetcode.com/problems/find-maximum-removals-from-source-string/
 * @difficulty Medium
 * @timeComplexity O(n · m)
 * @spaceComplexity O(m)
 *
 * @example
 * findMaximumRemovalsFromSourceString("abbaa", "aba", [0, 1, 2]); // 1
 */
export const findMaximumRemovalsFromSourceString = (
	source: string,
	pattern: string,
	targetIndices: readonly number[],
): number => {
	const m = pattern.length;
	const target = new Uint8Array(source.length);
	for (const i of targetIndices) target[i] = 1;
	const best = new Float64Array(m + 1).fill(Number.NEGATIVE_INFINITY);
	best[0] = 0;
	for (let i = 0; i < source.length; i++)
		for (let j = m; j >= 0; j--) {
			let value = (best[j] ?? 0) + (target[i] ?? 0);
			if (j > 0 && source[i] === pattern[j - 1])
				value = Math.max(value, best[j - 1] ?? 0);
			best[j] = value;
		}
	return best[m] ?? 0;
};
