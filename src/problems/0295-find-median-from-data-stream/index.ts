import { Heap } from "../../internal/heap";

/**
 * 295. Find Median from Data Stream
 *
 * Accepts a stream of numbers and returns the median of those added so far
 * at any time: the middle value, or the mean of the two middle values when
 * there's an even number.
 *
 * Keeps the smaller half in a max-heap and the larger half in a min-heap,
 * with the smaller half holding the extra value when the count is odd. The
 * median is then at the top of one or both heaps.
 *
 * @see https://leetcode.com/problems/find-median-from-data-stream/
 * @difficulty Hard
 * @timeComplexity O(log n) for addNum, O(1) for findMedian
 * @spaceComplexity O(n)
 *
 * @example
 * const finder = new FindMedianFromDataStream();
 * finder.addNum(1);
 * finder.addNum(2);
 * finder.findMedian(); // 1.5
 * finder.addNum(3);
 * finder.findMedian(); // 2
 */
export class FindMedianFromDataStream {
	readonly #lower = new Heap<number>((a, b) => b - a);
	readonly #upper = new Heap<number>((a, b) => a - b);

	addNum(num: number): void {
		// Pass the number through the lower half so the halves stay ordered.
		this.#lower.push(num);
		this.#upper.push(this.#lower.pop() ?? num);
		if (this.#upper.size > this.#lower.size)
			this.#lower.push(this.#upper.pop() ?? num);
	}

	/** The median of the numbers added so far. At least one must have been added. */
	findMedian(): number {
		const middle = this.#lower.peek() ?? 0;
		return this.#lower.size > this.#upper.size
			? middle
			: (middle + (this.#upper.peek() ?? 0)) / 2;
	}
}
