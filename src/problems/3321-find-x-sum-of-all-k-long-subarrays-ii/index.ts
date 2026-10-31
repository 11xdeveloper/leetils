import { Heap } from "../../internal/heap";

type Entry = [count: number, value: number, version: number];

/**
 * 3321. Find X-Sum of All K-Long Subarrays II
 *
 * An array's x-sum keeps only its `x` most frequent values (the larger
 * value wins a tie) and adds up those elements. Returns the x-sum of every
 * subarray of length `k`.
 *
 * Slide the window, splitting the distinct values into a top set of up to
 * `x` and the rest, and keeping the top set's sum. Each set is a heap with
 * lazy deletion: changing a value's count bumps its version, which
 * invalidates its old heap entries. After each change, move values between
 * the sets until the best of the rest is no better than the worst of the
 * top.
 *
 * @see https://leetcode.com/problems/find-x-sum-of-all-k-long-subarrays-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * findXSumOfAllKLongSubarraysII([1, 1, 2, 2, 3, 4, 2, 3], 6, 2); // [6, 10, 12]
 */
export const findXSumOfAllKLongSubarraysII = (
	nums: readonly number[],
	k: number,
	x: number,
): number[] => {
	const counts = new Map<number, number>();
	const versions = new Map<number, number>();
	const inTop = new Set<number>();
	const worstTop = new Heap<Entry>((a, b) => a[0] - b[0] || a[1] - b[1]);
	const bestRest = new Heap<Entry>((a, b) => b[0] - a[0] || b[1] - a[1]);
	let topSize = 0;
	let restSize = 0;
	let sum = 0;
	const entry = (value: number): Entry => [
		counts.get(value) ?? 0,
		value,
		versions.get(value) ?? 0,
	];
	const live = (e: Entry | undefined, top: boolean): boolean =>
		e !== undefined && versions.get(e[1]) === e[2] && inTop.has(e[1]) === top;
	const peek = (heap: Heap<Entry>, top: boolean): Entry | undefined => {
		while (heap.size > 0 && !live(heap.peek(), top)) heap.pop();
		return heap.peek();
	};
	const bump = (value: number): void => {
		versions.set(value, (versions.get(value) ?? 0) + 1);
	};
	const detach = (value: number): void => {
		const count = counts.get(value) ?? 0;
		if (inTop.has(value)) {
			inTop.delete(value);
			topSize--;
			sum -= count * value;
		} else if (count > 0) restSize--;
		bump(value);
	};
	const toTop = (value: number): void => {
		bump(value);
		inTop.add(value);
		topSize++;
		sum += (counts.get(value) ?? 0) * value;
		worstTop.push(entry(value));
	};
	const toRest = (value: number): void => {
		bump(value);
		restSize++;
		bestRest.push(entry(value));
	};
	const change = (value: number, delta: number): void => {
		detach(value);
		counts.set(value, (counts.get(value) ?? 0) + delta);
		if ((counts.get(value) ?? 0) > 0) toRest(value);
		for (;;) {
			const best = peek(bestRest, false);
			if (best && topSize < x) {
				restSize--;
				toTop(best[1]);
				continue;
			}
			const worst = peek(worstTop, true);
			if (
				!best ||
				!worst ||
				best[0] - worst[0] < 0 ||
				(best[0] === worst[0] && best[1] < worst[1])
			)
				break;
			inTop.delete(worst[1]);
			topSize--;
			sum -= worst[0] * worst[1];
			toRest(worst[1]);
			restSize--;
			toTop(best[1]);
		}
	};
	const result: number[] = [];
	nums.forEach((num, i) => {
		change(num, 1);
		if (i >= k) change(nums[i - k] ?? 0, -1);
		if (i >= k - 1) result.push(sum);
	});
	return result;
};
