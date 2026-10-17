/**
 * 2035. Partition Array Into Two Arrays to Minimize Sum Difference
 *
 * Splits the `2n` numbers into two arrays of `n` and returns the smallest
 * possible absolute difference of their sums.
 *
 * Meet in the middle: list each half's subset sums by size. Taking `k`
 * from the left half needs `n - k` from the right; binary search the
 * sorted right sums for the one bringing the pair closest to half the
 * total.
 *
 * @see https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/
 * @difficulty Hard
 * @timeComplexity O(2^n · n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * partitionArrayIntoTwoArraysToMinimizeSumDifference([3, 9, 7, 3]); // 2
 */
export const partitionArrayIntoTwoArraysToMinimizeSumDifference = (
	nums: readonly number[],
): number => {
	const n = nums.length / 2;
	const total = nums.reduce((sum, v) => sum + v, 0);
	const sumsBySize = (half: readonly number[]): number[][] => {
		const bySize: number[][] = Array.from({ length: n + 1 }, () => []);
		for (let mask = 0; mask < 1 << n; mask++) {
			let [sum, size] = [0, 0];
			for (let i = 0; i < n; i++) {
				if (mask & (1 << i)) [sum, size] = [sum + (half[i] ?? 0), size + 1];
			}
			bySize[size]?.push(sum);
		}
		return bySize;
	};
	const left = sumsBySize(nums.slice(0, n));
	const right = sumsBySize(nums.slice(n)).map((sums) =>
		sums.sort((a, b) => a - b),
	);

	let best = Infinity;
	for (let size = 0; size <= n; size++) {
		const options = right[n - size] ?? [];
		for (const a of left[size] ?? []) {
			// The first right sum with 2 · (a + b) ≥ total, and the one before.
			let [lo, hi] = [0, options.length];
			while (lo < hi) {
				const mid = (lo + hi) >> 1;
				if (2 * (a + (options[mid] ?? 0)) < total) lo = mid + 1;
				else hi = mid;
			}
			for (const b of [options[lo], options[lo - 1]]) {
				if (b !== undefined)
					best = Math.min(best, Math.abs(total - 2 * (a + b)));
			}
		}
	}
	return best;
};
