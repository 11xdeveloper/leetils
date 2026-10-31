import { Heap } from "../../internal/heap";

/**
 * 3369. Design an Array Statistics Tracker
 *
 * Track a sequence of numbers supporting `addNumber`,
 * `removeFirstAddedNumber`, and the mean (rounded down), median (the larger
 * middle one) and mode (the smallest most frequent) of what's there.
 *
 * Keep the numbers in a queue with a running sum for the mean. The median
 * comes from two heaps, the lower half and the upper half, with removals
 * done lazily: each half records the numbers removed from it and skips them
 * when they reach its top. The mode comes from a heap of (count, value)
 * snapshots, where stale snapshots are skipped.
 *
 * @see https://leetcode.com/problems/design-an-array-statistics-tracker/
 * @difficulty Hard
 * @timeComplexity O(log n) per operation, amortised
 * @spaceComplexity O(n)
 *
 * @example
 * const tracker = new DesignAnArrayStatisticsTracker();
 * tracker.addNumber(4);
 * tracker.addNumber(4);
 * tracker.addNumber(2);
 * tracker.addNumber(3);
 * tracker.getMean(); // 3
 * tracker.getMedian(); // 4
 * tracker.getMode(); // 4
 */
export class DesignAnArrayStatisticsTracker {
	readonly #queue: number[] = [];
	#head = 0;
	#sum = 0;
	readonly #lower = new Heap<number>((a, b) => b - a);
	readonly #upper = new Heap<number>((a, b) => a - b);
	#lowerSize = 0;
	#upperSize = 0;
	readonly #pendingLower = new Map<number, number>();
	readonly #pendingUpper = new Map<number, number>();
	readonly #counts = new Map<number, number>();
	readonly #modes = new Heap<[count: number, value: number]>(
		(a, b) => b[0] - a[0] || a[1] - b[1],
	);

	addNumber(number: number): void {
		this.#queue.push(number);
		this.#sum += number;
		this.#prune();
		if (this.#upperSize > 0 && number >= (this.#upper.peek() ?? 0)) {
			this.#upper.push(number);
			this.#upperSize++;
		} else {
			this.#lower.push(number);
			this.#lowerSize++;
		}
		this.#balance();
		const count = (this.#counts.get(number) ?? 0) + 1;
		this.#counts.set(number, count);
		this.#modes.push([count, number]);
	}

	removeFirstAddedNumber(): void {
		const number = this.#queue[this.#head++] ?? 0;
		this.#sum -= number;
		this.#prune();
		const inUpper = this.#upperSize > 0 && number >= (this.#upper.peek() ?? 0);
		const pending = inUpper ? this.#pendingUpper : this.#pendingLower;
		pending.set(number, (pending.get(number) ?? 0) + 1);
		if (inUpper) this.#upperSize--;
		else this.#lowerSize--;
		this.#prune();
		this.#balance();
		const count = (this.#counts.get(number) ?? 0) - 1;
		this.#counts.set(number, count);
		if (count > 0) this.#modes.push([count, number]);
	}

	getMean(): number {
		return Math.floor(this.#sum / (this.#queue.length - this.#head));
	}

	getMedian(): number {
		this.#prune();
		return this.#upper.peek() ?? 0;
	}

	getMode(): number {
		for (
			let top = this.#modes.peek();
			top && this.#counts.get(top[1]) !== top[0];
			top = this.#modes.peek()
		)
			this.#modes.pop();
		return this.#modes.peek()?.[1] ?? 0;
	}

	/** Drops removed numbers from the tops of both heaps. */
	#prune(): void {
		for (const [heap, pending] of [
			[this.#lower, this.#pendingLower],
			[this.#upper, this.#pendingUpper],
		] as const)
			for (
				let top = heap.peek();
				top !== undefined && (pending.get(top) ?? 0) > 0;
				top = heap.peek()
			) {
				pending.set(top, (pending.get(top) ?? 0) - 1);
				heap.pop();
			}
	}

	/** Keeps the upper half one bigger than, or the same size as, the lower half. */
	#balance(): void {
		for (;;) {
			this.#prune();
			if (this.#lowerSize > this.#upperSize) {
				this.#upper.push(this.#lower.pop() ?? 0);
				this.#lowerSize--;
				this.#upperSize++;
			} else if (this.#upperSize > this.#lowerSize + 1) {
				this.#lower.push(this.#upper.pop() ?? 0);
				this.#upperSize--;
				this.#lowerSize++;
			} else return;
		}
	}
}
