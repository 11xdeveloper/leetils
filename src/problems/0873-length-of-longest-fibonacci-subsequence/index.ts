/**
 * 873. Length of Longest Fibonacci Subsequence
 *
 * `arr` is strictly increasing. Returns the length of its longest
 * Fibonacci-like subsequence (at least three numbers, each the sum of the
 * two before), or 0 if there's none.
 *
 * `length[j][k]` is the longest such subsequence ending with `arr[j]` then
 * `arr[k]`. It extends the one ending `arr[i], arr[j]` when
 * `arr[i] = arr[k] - arr[j]` is in the array, found with a map of indices.
 *
 * @see https://leetcode.com/problems/length-of-longest-fibonacci-subsequence/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * lengthOfLongestFibonacciSubsequence([1, 2, 3, 4, 5, 6, 7, 8]); // 5: [1, 2, 3, 5, 8]
 */
export const lengthOfLongestFibonacciSubsequence = (
	arr: readonly number[],
): number => {
	const n = arr.length;
	const indexOf = new Map(arr.map((value, i) => [value, i]));
	const length = new Int32Array(n * n);
	let longest = 0;
	for (let k = 0; k < n; k++) {
		for (let j = 0; j < k; j++) {
			const i = indexOf.get((arr[k] ?? 0) - (arr[j] ?? 0));
			if (i === undefined || i >= j) continue;
			const extended = Math.max(3, (length[i * n + j] ?? 0) + 1);
			length[j * n + k] = extended;
			longest = Math.max(longest, extended);
		}
	}
	return longest;
};
