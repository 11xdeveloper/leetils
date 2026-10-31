import { Heap } from "../../internal/heap";

/**
 * 3478. Choose K Elements With Maximum Sum
 *
 * For each i, the largest sum of at most `k` values `nums2[j]` over indices
 * j with `nums1[j] < nums1[i]`.
 *
 * Process indices by increasing `nums1`, a whole group of equal values at a
 * time: answer the group from a min-heap holding the k largest `nums2`
 * values seen so far (and their sum), then add the group to it.
 *
 * @see https://leetcode.com/problems/choose-k-elements-with-maximum-sum/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * chooseKElementsWithMaximumSum([4, 2, 1, 5, 3], [10, 20, 30, 40, 50], 2); // [80, 30, 0, 80, 50]
 */
export const chooseKElementsWithMaximumSum = (
	nums1: readonly number[],
	nums2: readonly number[],
	k: number,
): number[] => {
	const order = nums1
		.map((_, i) => i)
		.sort((a, b) => (nums1[a] ?? 0) - (nums1[b] ?? 0));
	const kept = new Heap<number>((a, b) => a - b);
	let sum = 0;
	const answer = new Array<number>(nums1.length).fill(0);
	for (let start = 0; start < order.length; ) {
		let end = start;
		while (
			end < order.length &&
			nums1[order[end] ?? 0] === nums1[order[start] ?? 0]
		)
			end++;
		for (let t = start; t < end; t++) answer[order[t] ?? 0] = sum;
		for (let t = start; t < end; t++) {
			const value = nums2[order[t] ?? 0] ?? 0;
			kept.push(value);
			sum += value;
			if (kept.size > k) sum -= kept.pop() ?? 0;
		}
		start = end;
	}
	return answer;
};
