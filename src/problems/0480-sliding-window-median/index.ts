import { Heap } from "../../internal/heap";

/**
 * 480. Sliding Window Median
 *
 * Returns the median of each window of `k` consecutive numbers in `nums`,
 * from left to right. For even `k`, the median is the mean of the two middle
 * values.
 *
 * Keeps the window split between a max-heap of its lower half and a
 * min-heap of its upper half, with the lower half holding the extra element
 * when `k` is odd. Heaps can't remove arbitrary elements, so a number
 * leaving the window is only recorded; it's actually discarded once it
 * reaches the top of its heap. The sizes used for balancing count only
 * numbers still in the window.
 *
 * @see https://leetcode.com/problems/sliding-window-median/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * slidingWindowMedian([1, 3, -1, -3, 5, 3, 6, 7], 3); // [1, -1, -1, 3, 5, 6]
 */
export const slidingWindowMedian = (
	nums: readonly number[],
	k: number,
): number[] => {
	const lower = new Heap<number>((a, b) => b - a);
	const upper = new Heap<number>((a, b) => a - b);
	const pendingRemoval = new Map<number, number>();
	let lowerSize = 0;
	let upperSize = 0;

	const prune = (heap: Heap<number>): void => {
		for (let top = heap.peek(); top !== undefined; top = heap.peek()) {
			const pending = pendingRemoval.get(top) ?? 0;
			if (pending === 0) return;
			pendingRemoval.set(top, pending - 1);
			heap.pop();
		}
	};

	const balance = (): void => {
		if (lowerSize > upperSize + 1) {
			upper.push(lower.pop() ?? 0);
			lowerSize--;
			upperSize++;
			prune(lower);
		} else if (lowerSize < upperSize) {
			lower.push(upper.pop() ?? 0);
			upperSize--;
			lowerSize++;
			prune(upper);
		}
	};

	const add = (num: number): void => {
		if (lowerSize === 0 || num <= (lower.peek() ?? 0)) {
			lower.push(num);
			lowerSize++;
		} else {
			upper.push(num);
			upperSize++;
		}
		balance();
	};

	const remove = (num: number): void => {
		pendingRemoval.set(num, (pendingRemoval.get(num) ?? 0) + 1);
		if (num <= (lower.peek() ?? 0)) {
			lowerSize--;
			prune(lower);
		} else {
			upperSize--;
			prune(upper);
		}
		balance();
	};

	const medians: number[] = [];
	for (const [i, num] of nums.entries()) {
		add(num);
		if (i >= k) remove(nums[i - k] ?? 0);
		if (i >= k - 1) {
			const low = lower.peek() ?? 0;
			medians.push(k % 2 === 1 ? low : (low + (upper.peek() ?? 0)) / 2);
		}
	}

	return medians;
};
