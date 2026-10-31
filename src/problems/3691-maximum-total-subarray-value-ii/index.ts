import { Heap } from "../../internal/heap";

/**
 * 3691. Maximum Total Subarray Value II
 *
 * Choose `k` distinct subarrays, each worth its maximum minus its
 * minimum. Returns the largest total.
 *
 * Shrinking a subarray never raises its value, so for each start the
 * subarrays reaching furthest are worth the most. Start a heap with every
 * start's full-length subarray and repeatedly take the best, replacing it
 * with the same start one shorter. Sparse tables give range maxima and
 * minima in O(1).
 *
 * @see https://leetcode.com/problems/maximum-total-subarray-value-ii/
 * @difficulty Hard
 * @timeComplexity O((n + k) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * maximumTotalSubarrayValueII([4, 2, 5, 1], 3); // 12
 */
export const maximumTotalSubarrayValueII = (
	nums: readonly number[],
	k: number,
): number => {
	const n = nums.length;
	const highs: number[][] = [[...nums]];
	const lows: number[][] = [[...nums]];
	for (let level = 1; 1 << level <= n; level++) {
		const half = 1 << (level - 1);
		const [h, l] = [highs[level - 1] ?? [], lows[level - 1] ?? []];
		highs.push(
			Array.from({ length: n - (1 << level) + 1 }, (_, i) =>
				Math.max(h[i] ?? 0, h[i + half] ?? 0),
			),
		);
		lows.push(
			Array.from({ length: n - (1 << level) + 1 }, (_, i) =>
				Math.min(l[i] ?? 0, l[i + half] ?? 0),
			),
		);
	}
	const value = (from: number, to: number): number => {
		const level = 31 - Math.clz32(to - from + 1);
		const other = to - (1 << level) + 1;
		const high = Math.max(
			highs[level]?.[from] ?? 0,
			highs[level]?.[other] ?? 0,
		);
		const low = Math.min(lows[level]?.[from] ?? 0, lows[level]?.[other] ?? 0);
		return high - low;
	};
	const heap = new Heap<[worth: number, from: number, to: number]>(
		(a, b) => b[0] - a[0],
		Array.from({ length: n }, (_, from) => [value(from, n - 1), from, n - 1]),
	);
	let total = 0;
	for (let taken = 0; taken < k && heap.size > 0; taken++) {
		const [worth, from, to] = heap.pop() ?? [0, 0, 0];
		total += worth;
		if (to > from) heap.push([value(from, to - 1), from, to - 1]);
	}
	return total;
};
