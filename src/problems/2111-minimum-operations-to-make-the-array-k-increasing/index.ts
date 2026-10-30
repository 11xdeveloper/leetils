/**
 * 2111. Minimum Operations to Make the Array K-Increasing
 *
 * An array is K-increasing when `arr[i - k] <= arr[i]` everywhere. An
 * operation changes one element to anything. Returns the fewest
 * operations to make `arr` K-increasing.
 *
 * The `k` interleaved subsequences are independent; each keeps its
 * longest non-decreasing subsequence (patience sorting) and changes the
 * rest.
 *
 * @see https://leetcode.com/problems/minimum-operations-to-make-the-array-k-increasing/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumOperationsToMakeTheArrayKIncreasing([5, 4, 3, 2, 1], 1); // 4
 */
export const minimumOperationsToMakeTheArrayKIncreasing = (
	arr: readonly number[],
	k: number,
): number => {
	let kept = 0;
	for (let start = 0; start < k; start++) {
		const tails: number[] = [];
		for (let i = start; i < arr.length; i += k) {
			const value = arr[i] ?? 0;
			let [lo, hi] = [0, tails.length];
			while (lo < hi) {
				const mid = (lo + hi) >> 1;
				if ((tails[mid] ?? 0) <= value) lo = mid + 1;
				else hi = mid;
			}
			tails[lo] = value;
		}
		kept += tails.length;
	}
	return arr.length - kept;
};
