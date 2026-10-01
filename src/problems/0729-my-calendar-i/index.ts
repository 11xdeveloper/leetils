/**
 * 729. My Calendar I
 *
 * A calendar of half-open events `[start, end)`. `book` adds an event and
 * returns true unless it would overlap one already booked, in which case it
 * returns false and adds nothing.
 *
 * Keeps the events sorted by start. Binary search finds where a new event
 * would go, and it only has to be checked against its two neighbours.
 *
 * @see https://leetcode.com/problems/my-calendar-i/
 * @difficulty Medium
 * @timeComplexity O(n) per booking for the insertion, O(log n) to check
 * @spaceComplexity O(n)
 *
 * @example
 * const calendar = new MyCalendarI();
 * calendar.book(10, 20); // true
 * calendar.book(15, 25); // false
 */
export class MyCalendarI {
	readonly #events: [start: number, end: number][] = [];

	book(startTime: number, endTime: number): boolean {
		let low = 0;
		let high = this.#events.length;
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((this.#events[mid]?.[0] ?? 0) < startTime) low = mid + 1;
			else high = mid;
		}

		const before = this.#events[low - 1];
		const after = this.#events[low];
		if ((before && before[1] > startTime) || (after && after[0] < endTime))
			return false;
		this.#events.splice(low, 0, [startTime, endTime]);
		return true;
	}
}
