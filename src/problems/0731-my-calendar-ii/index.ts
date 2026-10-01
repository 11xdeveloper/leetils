/**
 * 731. My Calendar II
 *
 * A calendar of half-open events `[start, end)` that allows double
 * bookings. `book` adds an event and returns true unless some moment would
 * then be booked three times, in which case it returns false and adds
 * nothing.
 *
 * Keeps every booked event and, separately, every stretch already booked
 * twice. A new event is refused if it overlaps a double-booked stretch;
 * otherwise its overlaps with the booked events become new double-booked
 * stretches.
 *
 * @see https://leetcode.com/problems/my-calendar-ii/
 * @difficulty Medium
 * @timeComplexity O(n) per booking
 * @spaceComplexity O(n)
 *
 * @example
 * const calendar = new MyCalendarII();
 * calendar.book(10, 20); // true
 * calendar.book(15, 25); // true, double booked from 15 to 20
 * calendar.book(18, 22); // false, 18 to 20 would be triple booked
 */
export class MyCalendarII {
	readonly #booked: [start: number, end: number][] = [];
	readonly #doubled: [start: number, end: number][] = [];

	book(startTime: number, endTime: number): boolean {
		if (
			this.#doubled.some(([start, end]) => start < endTime && startTime < end)
		)
			return false;
		for (const [start, end] of this.#booked) {
			if (start < endTime && startTime < end)
				this.#doubled.push([
					Math.max(start, startTime),
					Math.min(end, endTime),
				]);
		}
		this.#booked.push([startTime, endTime]);
		return true;
	}
}
