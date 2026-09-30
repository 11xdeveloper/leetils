import { Heap } from "../../internal/heap";

/**
 * 1383. Maximum Performance of a Team
 *
 * A team of at most `k` engineers performs at the sum of their speeds times
 * the lowest efficiency among them. Returns the best performance, modulo
 * 10^9 + 7 (maximised before reducing).
 *
 * Tries each engineer as the least efficient member: taking engineers in
 * decreasing efficiency, keep the `k` fastest seen so far in a min-heap.
 * Products can pass 2^53, so they're compared as BigInts.
 *
 * @see https://leetcode.com/problems/maximum-performance-of-a-team/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumPerformanceOfATeam(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 2); // 60
 */
export const maximumPerformanceOfATeam = (
	n: number,
	speed: readonly number[],
	efficiency: readonly number[],
	k: number,
): number => {
	const engineers = Array.from({ length: n }, (_, i) => i).sort(
		(a, b) => (efficiency[b] ?? 0) - (efficiency[a] ?? 0),
	);
	const fastest = new Heap<number>((a, b) => a - b);
	let [total, best] = [0, 0n];
	for (const engineer of engineers) {
		const s = speed[engineer] ?? 0;
		fastest.push(s);
		total += s;
		if (fastest.size > k) total -= fastest.pop() ?? 0;
		const performance = BigInt(total) * BigInt(efficiency[engineer] ?? 0);
		if (performance > best) best = performance;
	}
	return Number(best % 1_000_000_007n);
};
