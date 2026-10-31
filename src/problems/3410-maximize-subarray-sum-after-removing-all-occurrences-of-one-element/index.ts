/**
 * 3410. Maximize Subarray Sum After Removing All Occurrences of One Element
 *
 * Optionally remove every copy of one value from `nums` (leaving it
 * non-empty), then take the largest subarray sum. Returns the best result.
 *
 * If every element is negative, the best is just the largest element.
 * Otherwise removing a value is the same as zeroing it, so keep a segment
 * tree of Kadane summaries (total, best prefix, best suffix, best
 * subarray), zero each value's positions in turn, read the root and
 * restore.
 *
 * @see https://leetcode.com/problems/maximize-subarray-sum-after-removing-all-occurrences-of-one-element/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximizeSubarraySumAfterRemovingAllOccurrencesOfOneElement([-3, 2, -2, -1, 3, -2, 3]); // 7
 */
export const maximizeSubarraySumAfterRemovingAllOccurrencesOfOneElement = (
	nums: readonly number[],
): number => {
	const largest = Math.max(...nums);
	if (largest < 0) return largest;
	let size = 1;
	while (size < nums.length) size *= 2;
	const total = new Float64Array(2 * size);
	const prefix = new Float64Array(2 * size);
	const suffix = new Float64Array(2 * size);
	const best = new Float64Array(2 * size);
	const setLeaf = (i: number, value: number): void => {
		const node = size + i;
		total[node] = value;
		prefix[node] = suffix[node] = best[node] = Math.max(0, value);
	};
	const pull = (node: number): void => {
		const [l, r] = [2 * node, 2 * node + 1];
		total[node] = (total[l] ?? 0) + (total[r] ?? 0);
		prefix[node] = Math.max(prefix[l] ?? 0, (total[l] ?? 0) + (prefix[r] ?? 0));
		suffix[node] = Math.max(suffix[r] ?? 0, (total[r] ?? 0) + (suffix[l] ?? 0));
		best[node] = Math.max(
			best[l] ?? 0,
			best[r] ?? 0,
			(suffix[l] ?? 0) + (prefix[r] ?? 0),
		);
	};
	const update = (i: number, value: number): void => {
		setLeaf(i, value);
		for (let node = (size + i) >> 1; node > 0; node >>= 1) pull(node);
	};
	nums.forEach((num, i) => {
		setLeaf(i, num);
	});
	for (let node = size - 1; node > 0; node--) pull(node);
	let answer = best[1] ?? 0;
	const positions = new Map<number, number[]>();
	nums.forEach((num, i) => {
		if (num < 0) positions.set(num, [...(positions.get(num) ?? []), i]);
	});
	for (const [value, at] of positions) {
		for (const i of at) update(i, 0);
		answer = Math.max(answer, best[1] ?? 0);
		for (const i of at) update(i, value);
	}
	return answer;
};
