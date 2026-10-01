import { Heap } from "../../internal/heap";

/**
 * 857. Minimum Cost to Hire K Workers
 *
 * Hires exactly `k` workers, paying each in proportion to their `quality`
 * and at least their `wage` expectation. Returns the least total cost.
 *
 * A group's pay rate is set by its most demanding member, the highest
 * `wage / quality`, and it costs that rate times the group's total quality.
 * Taking workers in increasing order of rate, each as the most demanding
 * member, the best group keeps the `k` smallest qualities so far, held in
 * a max-heap.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-hire-k-workers/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToHireKWorkers([10, 20, 5], [70, 50, 30], 2); // 105
 */
export const minimumCostToHireKWorkers = (
	quality: readonly number[],
	wage: readonly number[],
	k: number,
): number => {
	const workers = quality
		.map((q, i) => [(wage[i] ?? 0) / q, q] as const)
		.sort((a, b) => a[0] - b[0]);
	const largestQualities = new Heap<number>((a, b) => b - a);
	let qualitySum = 0;
	let best = Number.POSITIVE_INFINITY;
	for (const [rate, q] of workers) {
		largestQualities.push(q);
		qualitySum += q;
		if (largestQualities.size > k) qualitySum -= largestQualities.pop() ?? 0;
		if (largestQualities.size === k) best = Math.min(best, rate * qualitySum);
	}
	return best;
};
