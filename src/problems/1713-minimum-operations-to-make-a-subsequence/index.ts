/**
 * 1713. Minimum Operations to Make a Subsequence
 *
 * Returns the fewest insertions into `arr` that make the distinct-valued
 * `target` a subsequence of it.
 *
 * Keep the longest common subsequence and insert the rest. Since `target`
 * is distinct, replacing values of `arr` by their positions in `target`
 * turns that into a longest strictly increasing subsequence.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-a-subsequence/
 * @difficulty Hard
 * @timeComplexity O(n + m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumOperationsToMakeASubsequence([6, 4, 8, 1, 3, 2], [4, 7, 6, 2, 3, 8, 6, 1]); // 3
 */
export const minimumOperationsToMakeASubsequence = (
	target: readonly number[],
	arr: readonly number[],
): number => {
	const position = new Map(target.map((value, i) => [value, i]));
	const tails: number[] = [];
	for (const value of arr) {
		const index = position.get(value);
		if (index === undefined) continue;
		let [low, high] = [0, tails.length];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((tails[mid] ?? 0) < index) low = mid + 1;
			else high = mid;
		}
		tails[low] = index;
	}
	return target.length - tails.length;
};
