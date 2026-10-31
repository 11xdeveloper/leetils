import { Heap } from "../../internal/heap";

/**
 * 3049. Earliest Second to Mark Indices II
 *
 * In second s (from 1), you may decrement any element of `nums`, set
 * `nums[changeIndices[s - 1]]` (1-indexed) to 0, mark any index whose
 * value is 0, or do nothing. Returns the earliest second by which every
 * index can be marked, or -1.
 *
 * Binary search on the deadline. Zeroing an index is only worth it at its
 * first chance, and only for values above 1, and it needs a later free
 * second to mark it. Walk the seconds backwards, counting free ones and
 * zeroing greedily; when no free second is left after one, swap out the
 * cheapest earlier choice if this one saves more. Everything not zeroed
 * then needs its value plus one free second.
 *
 * @see https://leetcode.com/problems/earliest-second-to-mark-indices-ii/
 * @difficulty Hard
 * @timeComplexity O(m log m · log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * earliestSecondToMarkIndicesII([3, 2, 3], [1, 3, 2, 2, 2, 2, 3]); // 6
 */
export const earliestSecondToMarkIndicesII = (
	nums: readonly number[],
	changeIndices: readonly number[],
): number => {
	const n = nums.length;
	let total = n;
	for (const num of nums) total += num;
	const canFinishBy = (deadline: number): boolean => {
		const first = new Int32Array(n + 1).fill(-1);
		for (let s = deadline - 1; s >= 0; s--) first[changeIndices[s] ?? 0] = s;
		const zeroed = new Heap<number>((a, b) => a - b);
		let saved = 0;
		let free = 0;
		for (let s = deadline - 1; s >= 0; s--) {
			const index = changeIndices[s] ?? 0;
			const value = nums[index - 1] ?? 0;
			if (value <= 1 || first[index] !== s) {
				free++;
				continue;
			}
			if (free === 0) {
				const cheapest = zeroed.peek();
				if (cheapest === undefined || value <= cheapest) {
					free++;
					continue;
				}
				zeroed.pop();
				saved -= cheapest + 1;
				free += 2;
			}
			zeroed.push(value);
			saved += value + 1;
			free--;
		}
		return free >= total - saved;
	};
	let lo = 1;
	let hi = changeIndices.length + 1;
	while (lo < hi) {
		const mid = (lo + hi) >>> 1;
		if (canFinishBy(mid)) hi = mid;
		else lo = mid + 1;
	}
	return lo > changeIndices.length ? -1 : lo;
};
