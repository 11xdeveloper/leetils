/**
 * 786. K-th Smallest Prime Fraction
 *
 * `arr` is sorted and holds 1 and distinct primes. Among the fractions
 * `arr[i] / arr[j]` with `i < j`, returns the `k`th smallest (from 1) as
 * `[numerator, denominator]`.
 *
 * Binary search on the value. For a guess `x`, two pointers count the
 * fractions at most `x` and find the largest of them. When exactly `k` are
 * at most `x`, that largest one is the answer.
 *
 * @see https://leetcode.com/problems/k-th-smallest-prime-fraction/
 * @difficulty Medium
 * @timeComplexity O(n log W) for the number of halvings W needed to separate fractions
 * @spaceComplexity O(1)
 *
 * @example
 * kThSmallestPrimeFraction([1, 2, 3, 5], 3); // [2, 5]
 */
export const kThSmallestPrimeFraction = (
	arr: readonly number[],
	k: number,
): number[] => {
	const n = arr.length;
	let low = 0;
	let high = 1;
	for (;;) {
		const mid = (low + high) / 2;
		let count = 0;
		let best = [0, 1];
		// For each numerator, the fractions at most mid are those with large enough denominators.
		for (let i = 0, j = 1; i < n - 1; i++) {
			while (j < n && (arr[i] ?? 0) > mid * (arr[j] ?? 1)) j++;
			if (j === n) break;
			count += n - j;
			if ((arr[i] ?? 0) * (best[1] ?? 1) > (best[0] ?? 0) * (arr[j] ?? 1))
				best = [arr[i] ?? 0, arr[j] ?? 1];
		}
		if (count === k) return best;
		if (count < k) low = mid;
		else high = mid;
	}
};
