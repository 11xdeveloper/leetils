/**
 * 732. My Calendar III
 *
 * A calendar of half-open events `[start, end)` that accepts every event.
 * After each `book`, returns the largest number of events overlapping at
 * any moment so far.
 *
 * Keeps the event boundaries sorted with their changes in the number of
 * events (+1 at a start, -1 at an end), and sweeps them in order after each
 * booking to find the peak.
 *
 * @see https://leetcode.com/problems/my-calendar-iii/
 * @difficulty Hard
 * @timeComplexity O(n) per booking
 * @spaceComplexity O(n)
 *
 * @example
 * const calendar = new MyCalendarIII();
 * calendar.book(10, 20); // 1
 * calendar.book(50, 60); // 1
 * calendar.book(10, 40); // 2
 */
export class MyCalendarIII {
	readonly #times: number[] = [];
	readonly #changes: number[] = [];

	book(startTime: number, endTime: number): number {
		this.#change(startTime, 1);
		this.#change(endTime, -1);
		let current = 0;
		let peak = 0;
		for (const change of this.#changes) {
			current += change;
			peak = Math.max(peak, current);
		}
		return peak;
	}

	#change(time: number, delta: number): void {
		let low = 0;
		let high = this.#times.length;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((this.#times[mid] ?? 0) < time) low = mid + 1;
			else high = mid;
		}
		if (this.#times[low] === time) {
			this.#changes[low] = (this.#changes[low] ?? 0) + delta;
		} else {
			this.#times.splice(low, 0, time);
			this.#changes.splice(low, 0, delta);
		}
	}
}
